import { isDefined } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { StockSearch, StocksService } from "@shared/services";
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
  ticker: "GOOG",
  company_name: "Alphabet Inc."
};

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav-content>
        <app-main-nav (onSearchBlur)="onSearchBlur($event)"></app-main-nav>
        <router-outlet></router-outlet>
        <section
          class="Main"
          fxLayout
          fxLayout.xs="column"
          fxLayoutAlign="center"
          fxLayoutGap="32px"
          fxLayoutGap.xs="0"
        >
          <div class="Main-cards" fxFlex="20%">
            <mat-card>
              <ng-container *ngIf="!isLoadingStock">
                <mat-card-header>
                  <mat-card-title>News</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <app-stock-news [stockData$]="stock$"></app-stock-news>
                </mat-card-content>
              </ng-container>
              <mat-spinner
                class="Main-spinner"
                *ngIf="isLoadingStock"
                [color]="'accent'"
                [diameter]="50"
              ></mat-spinner>
            </mat-card>
            <mat-card>
              <ng-container *ngIf="!isLoadingStock">
                <mat-card-header>
                  <mat-card-title>FOIA Requests</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <app-stock-foia [stockData$]="stock$"></app-stock-foia>
                </mat-card-content>
              </ng-container>
              <mat-spinner
                class="Main-spinner"
                *ngIf="isLoadingStock"
                [color]="'accent'"
                [diameter]="50"
              >
              </mat-spinner>
            </mat-card>
          </div>
          <div class="Main-cards" fxFlex="50%">
            <mat-card>
              <ng-container *ngIf="!isLoadingStock">
                <mat-card-header>
                  <mat-card-title
                    >{{ currentStockSymbol }} Historical Details</mat-card-title
                  >
                </mat-card-header>
                <mat-card-content>
                  <app-stock-detail [stockData$]="stock$"></app-stock-detail>
                </mat-card-content>
              </ng-container>
              <mat-spinner
                class="Main-spinner"
                *ngIf="isLoadingStock"
                [color]="'accent'"
                [diameter]="50"
              ></mat-spinner>
            </mat-card>
          </div>
          <div class="Main-cards" fxFlex="30%">
            <app-stock-helper
              [busy]="isLoadingStock"
              [stockData$]="stock$"
            ></app-stock-helper>
          </div>
        </section>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  selector: "app-root",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  stockSubject = new Rx.BehaviorSubject<StockSearch>(undefined);
  stock$: Rx.Observable<any>;
  isLoadingStock = true;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
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
          Rx.of(stock)
        ).pipe(
          map(([stock, news, foia, stockSearch]) => {
            if (!stock || !news || !foia) {
              return undefined;
            }

            return {
              foia,
              news,
              ...stock,
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

  onSearchBlur(stock: StockSearch) {
    this.stockSubject.next(stock);
  }
}
