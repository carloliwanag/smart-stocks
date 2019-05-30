import { isDefined } from "@angular/compiler/src/util";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { StocksService } from "@shared/services";
import * as Rx from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";

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
export class AppComponent implements OnInit, OnDestroy {
  searchStockResultSubject = new Rx.BehaviorSubject(undefined);
  searchNewsSubject = new Rx.BehaviorSubject(undefined);
  searchStockSubject = new Rx.BehaviorSubject(undefined);

  searchStockResult$: Rx.Observable<string>;
  searchNews$ = this.searchNewsSubject.asObservable();
  searchStock$ = this.searchStockSubject.asObservable();

  currentStockSymbol: string;
  isLoadingStocks = false;
  isLoadingNews = false;

  searchStockSubscription: Rx.Subscription;
  searchNewsSubscription: Rx.Subscription;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.searchStockResult$ = this.searchStockResultSubject.asObservable().pipe(
      startWith(DEFAULT_STOCK_SYMBOL),
      filter(isDefined),
      distinctUntilChanged(),
      tap(symbol => {
        this.currentStockSymbol = symbol;
      })
    );

    this.searchStockSubscription = this.searchStockResult$
      .pipe(
        tap(() => {
          this.isLoadingStocks = true;
        }),
        switchMap(symbol => this.stocksService.getByStockSymbol(symbol)),
        map(data => {
          if (data) {
            return {
              ...data,
              symbol: this.currentStockSymbol
            };
          }

          return undefined;
        }),
        tap(() => {
          this.isLoadingStocks = false;
        })
      )
      .subscribe(data => this.searchStockSubject.next(data));

    this.searchNewsSubscription = this.searchStockResult$
      .pipe(
        tap(() => {
          this.isLoadingNews = true;
        }),
        switchMap(symbol => this.stocksService.getNewsByStockSymbol(symbol)),
        map(data => {
          if (data && data.TOP_NEWS.length > 0) {
            return data.TOP_NEWS;
          }

          return undefined;
        }),
        tap(() => {
          this.isLoadingNews = false;
        })
      )
      .subscribe(data => this.searchNewsSubject.next(data));
  }

  ngOnDestroy() {
    if (this.searchStockSubscription) {
      this.searchStockSubscription.unsubscribe();
    }
  }

  onSearchBlur(keyword: string) {
    this.currentStockSymbol = keyword;
    this.searchStockResultSubject.next(keyword);
  }
}
