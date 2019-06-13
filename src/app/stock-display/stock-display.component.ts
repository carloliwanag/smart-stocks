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
  ticker: "TSLA",
  company_name: "Tesla, Inc."
};

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
        <div class="StockDisplay-cards" fxFlex="60%">
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
        </div>
        <div class="StockDisplay-cards" fxFlex="40%">
          <app-stock-helper
            [busy]="isLoadingStock"
            [stock]="stock$ | async"
          ></app-stock-helper>
        </div>
      </mat-drawer-content>
      <mat-drawer
        class="StockDisplay-info"
        style="width: 40%"
        #drawer
        [mode]="'over'"
        [position]="'end'"
      >
        <app-stock-info
          [stockDetailSearch$]="stockDetailSearch$"
          (close)="onCloseSideDrawer()"
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
  stockDetailSearch$ = this.stockDetailSearchSubject.asObservable();

  currentStockSymbol: string;
  isLoadingStock = true;
  isLoadingStockInfo = true;
  navSearchSubscription: Rx.Subscription;

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
        this.sideDrawer.close();
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
          Rx.of(stock)
        ).pipe(
          map(([stock, foia, sentiments, stockSearch]) => {
            return {
              foia,
              ...stock,
              ...sentiments,
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
    // console.log(data);
    this.sideDrawer.open();
    this.stockDetailSearchSubject.next({
      symbol: this.currentStockSymbol,
      date
    });
  }

  onCloseSideDrawer() {
    this.sideDrawer.close();
  }
}
