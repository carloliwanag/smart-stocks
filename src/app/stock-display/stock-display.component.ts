import { isDefined } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { NavSearchService, StockSearch, StocksService } from "@shared/services";
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
    <section
      class="StockDisplay"
      fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="32px"
      fxLayoutGap.xs="0"
    >
      <div class="StockDisplay-cards" fxFlex="70%">
        <app-stock-trending
          class="StockDisplay-components"
          [busy]="isLoadingStock"
          [stock$]="stock$"
        ></app-stock-trending>
        <mat-card *ngIf="!isLoadingStock">
          <mat-card-header>
            <mat-card-title>Technical Details</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-tab-group [dynamicHeight]="true">
              <mat-tab label="Financial">
                <app-stock-finance-details [data]="stock$ | async">
                </app-stock-finance-details>
              </mat-tab>
              <mat-tab label="Statistics">
                <app-stock-statistics
                  [data]="stock$ | async"
                ></app-stock-statistics>
              </mat-tab>
              <mat-tab label="News">
                <app-stock-news [stockData$]="stock$ | async"> </app-stock-news>
              </mat-tab>
            </mat-tab-group>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="StockDisplay-cards" fxFlex="30%">
        <app-stock-helper
          [busy]="isLoadingStock"
          [stockData$]="stock$"
        ></app-stock-helper>
      </div>
    </section>
  `,
  selector: "app-stock-display",
  styleUrls: ["./stock-display.component.scss"]
})
export class StockDisplayComponent implements OnInit {
  stockSubject = new Rx.BehaviorSubject<StockSearch>(undefined);
  stock$: Rx.Observable<any>;
  isLoadingStock = true;
  navSearchSubscription: Rx.Subscription;

  constructor(
    private stocksService: StocksService,
    private navSearchService: NavSearchService
  ) {}

  ngOnInit() {
    this.navSearchSubscription = this.navSearchService
      .getObservable()
      .subscribe(keyword => this.stockSubject.next(keyword));
    this.stock$ = this.stockSubject.asObservable().pipe(
      startWith(DEFAULT_STOCK),
      filter(isDefined),
      distinctUntilChanged(),
      tap(() => {
        this.isLoadingStock = true;
      }),
      switchMap((stock: StockSearch) =>
        Rx.zip(
          this.stocksService.getByStockSymbol(stock.ticker),
          this.stocksService.getNewsByStockSymbol(stock.ticker),
          this.stocksService.getFOIARequestBySymbol(stock.company_name),
          this.stocksService.getSentimentBySymbol(stock.ticker),
          Rx.of(stock)
        ).pipe(
          map(([stock, news, foia, sentiments, stockSearch]) => {
            if (!stock || !news || !foia || !sentiments) {
              return undefined;
            }

            return {
              foia,
              news,
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
}
