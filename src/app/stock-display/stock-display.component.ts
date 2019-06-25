import { isDefined } from "@angular/compiler/src/util";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatDrawerContainer } from "@angular/material";
import {
  NavSearchService,
  StockDetailSearch,
  StockSearch,
  StocksService
} from "@shared/services";
import * as Rx from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";

export const DEFAULT_STOCK: StockSearch = {
  ticker: "PTE", // "TSLA",
  company_name: "PolarityTE, Inc." // "Tesla, Inc."
};

const DEFAULT_COLUMN_WIDTH = {
  left: "60%",
  right: "40%"
};

const PREVIEW_COLUMN_WIDTH = {
  left: "36%",
  right: "64%"
};

export interface ColumWidth {
  left: string;
  right: string;
}

@Component({
  template: `
    <mat-drawer-container class="example-container" [hasBackdrop]="false">
      <mat-drawer-content
        class="StockDisplay"
        fxLayout
        fxLayout.xs="column"
        fxLayoutAlign="center"
        fxLayoutGap="32px"
        fxLayoutGap.xs="0"
      >
        <div class="StockDisplay-cards" [fxFlex]="columnWidth.left">
          <app-stock-trending
            class="StockDisplay-components"
            [busy]="isLoadingStock"
            [stock]="stock$ | async"
            (clickData)="onClickStockTrending($event)"
          ></app-stock-trending>
          <app-stock-sentiment
            *ngIf="!isLoadingStock"
            class="StockDisplay-components"
            [busy]="isLoadingStock"
            [stock]="stock$ | async"
            (clickData)="onClickStockTrending($event)"
          ></app-stock-sentiment>
          <app-stock-event-card
            *ngIf="!isLoadingStock"
            class="StockDisplay-components"
            [busy]="isLoadingStock"
            [events]="(stock$ | async)?.events"
          >
          </app-stock-event-card>
        </div>
        <div class="StockDisplay-cards" [fxFlex]="columnWidth.right">
          <app-stock-helper
            [busy]="isLoadingStock"
            [stock]="stock$ | async"
          ></app-stock-helper>
        </div>
      </mat-drawer-content>
      <mat-drawer
        #drawer
        class="StockDisplay-info"
        [mode]="'over'"
        [position]="'end'"
      >
        <app-stock-info
          [stockDetailSearch$]="stockDetailSearch$"
          (close)="onToggleSideDrawer(false)"
        ></app-stock-info>
      </mat-drawer>
    </mat-drawer-container>
  `,
  selector: "app-stock-display",
  styleUrls: ["./stock-display.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDisplayComponent implements OnInit {
  @ViewChild("drawer") sideDrawer: MatDrawerContainer;

  stockSubject = new Rx.BehaviorSubject<StockSearch>(undefined);
  stockDetailSearchSubject = new Rx.BehaviorSubject<StockDetailSearch>(
    undefined
  );
  stock$: Rx.Observable<any>;
  stockDetailSearch$ = this.stockDetailSearchSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  currentStockSymbol: string;
  isLoadingStock = true;
  isLoadingStockInfo = true;
  navSearchSubscription: Rx.Subscription;

  columnWidth: ColumWidth = DEFAULT_COLUMN_WIDTH;

  constructor(
    private cd: ChangeDetectorRef,
    private stocksService: StocksService,
    private navSearchService: NavSearchService
  ) {}

  ngOnInit() {
    this.currentStockSymbol = DEFAULT_STOCK.ticker;
    this.navSearchSubscription = this.navSearchService
      .getObservable()
      .subscribe(keyword => {
        this.onToggleSideDrawer(false);
        this.stockSubject.next(keyword);
      });

    this.stock$ = this.stockSubject.asObservable().pipe(
      startWith(DEFAULT_STOCK),
      filter(isDefined),
      distinctUntilChanged(),
      tap(symbol => {
        this.isLoadingStock = true;
        this.cd.detectChanges();
        this.currentStockSymbol = symbol.ticker;
      }),
      switchMap((stock: StockSearch) =>
        Rx.zip(
          this.stocksService.getByStockSymbol(stock.ticker),
          this.stocksService.getFOIARequestBySymbol(stock.company_name),
          this.stocksService.getSentimentBySymbol(stock.ticker),
          this.stocksService.getEventsMap(stock.ticker),
          Rx.of(stock)
        ).pipe(
          map(([stock, foia, sentiments, eventsMap, stockSearch]) => {
            return {
              foia,
              ...stock,
              ...sentiments,
              events: eventsMap,
              stock_code: stockSearch.ticker,
              company_name: stockSearch.company_name
            };
          })
        )
      ),
      tap(() => {
        this.isLoadingStock = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );
  }

  ngOnDestroy(): void {
    if (this.navSearchSubscription) {
      this.navSearchSubscription.unsubscribe();
    }
  }

  onClickStockTrending(date: string) {
    this.onToggleSideDrawer(true);
    this.stockDetailSearchSubject.next({
      symbol: this.currentStockSymbol,
      date
    });
  }

  onToggleSideDrawer(visible: boolean) {
    if (visible) {
      this.sideDrawer.open();
      this.columnWidth = PREVIEW_COLUMN_WIDTH;
    } else {
      this.columnWidth = DEFAULT_COLUMN_WIDTH;
      this.sideDrawer.close();
    }
    this.cd.detectChanges();
  }
}
