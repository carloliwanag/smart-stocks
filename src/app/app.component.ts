import { Component } from "@angular/core";
import { StocksService } from "@shared/services";
import * as Rx from "rxjs";

export const DEFAULT_STOCK_SYMBOL = "GOOG";

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
              <ng-container *ngIf="!isLoadingNews">
                <mat-card-header>
                  <mat-card-title>News</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <app-stock-news [stockData$]="searchNews$"></app-stock-news>
                </mat-card-content>
              </ng-container>
              <mat-spinner
                class="Main-spinner"
                *ngIf="isLoadingNews"
                [color]="'accent'"
                [diameter]="50"
              ></mat-spinner>
            </mat-card>
          </div>
          <div class="Main-cards" fxFlex="50%">
            <mat-card>
              <ng-container *ngIf="!isLoadingStocks">
                <mat-card-header>
                  <mat-card-title
                    >{{ currentStockSymbol }} Historical Details</mat-card-title
                  >
                </mat-card-header>
                <mat-card-content>
                  <app-stock-detail
                    [stockData$]="searchStock$"
                  ></app-stock-detail>
                </mat-card-content>
              </ng-container>
              <mat-spinner
                class="Main-spinner"
                *ngIf="isLoadingStocks"
                [color]="'accent'"
                [diameter]="50"
              ></mat-spinner>
            </mat-card>
          </div>
          <div class="Main-cards" fxFlex="30%">
            <app-stock-helper
              [busy]="isLoadingStocks"
              [stockData$]="searchStock$"
            ></app-stock-helper>
          </div>
        </section>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  selector: "app-root",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  searchNewsSubject = new Rx.BehaviorSubject(undefined);
  searchNews$ = this.searchNewsSubject.asObservable();
  searchStockSubject = new Rx.BehaviorSubject(undefined);
  searchStock$ = this.searchStockSubject.asObservable();
  currentStockSymbol: string;
  isLoadingStocks = false;
  isLoadingNews = false;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.searchStockSymbol(DEFAULT_STOCK_SYMBOL);
  }

  onSearchBlur(keyword: string) {
    this.searchStockSymbol(keyword);
  }

  private searchStockSymbol(symbol: string) {
    if (symbol === this.currentStockSymbol) {
      return;
    }

    this.isLoadingStocks = true;
    this.isLoadingNews = true;

    this.stocksService
      .getByStockSymbol(symbol)
      .toPromise()
      .then(data => {
        if (data) {
          return {
            ...data,
            symbol
          };
        }

        return undefined;
      })
      .catch(() => undefined)
      .then(data => {
        this.searchStockSubject.next(data);
        this.isLoadingStocks = false;
      });

    this.stocksService
      .getNewsByStockSymbol(symbol)
      .toPromise()
      .then(data => {
        if (data && data.TOP_NEWS.length > 0) {
          return data.TOP_NEWS;
        }

        return undefined;
      })
      .catch(() => undefined)
      .then(data => {
        this.searchNewsSubject.next(data);
        this.isLoadingNews = false;
      });

    this.currentStockSymbol = symbol;
  }
}
