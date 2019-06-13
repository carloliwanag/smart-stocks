import { isDefined } from "@angular/compiler/src/util";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  StockDetailSearch,
  StockNewsList,
  StocksService
} from "@shared/services";
import * as moment from "moment";
import * as Rx from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  publishReplay,
  refCount,
  switchMap,
  tap
} from "rxjs/operators";

@Component({
  template: `
    <section class="StockInfo-header">
      <div class="StockInfo-title" *ngIf="stockDetailSearch$ | async as data">
        {{ getDate(data.date) }}
      </div>
      <mat-icon class="StockInfo-close" (click)="onClose()">close</mat-icon>
    </section>
    <mat-tab-group [dynamicHeight]="true">
      <mat-tab label="Financial">
        <app-stock-finance-details
          [hidden]="isLoadingStock"
          [data]="stock$ | async"
        ></app-stock-finance-details>
        <mat-spinner
          class="StockInfo-spinner"
          *ngIf="isLoadingStock"
          [color]="'accent'"
          [diameter]="50"
        ></mat-spinner>
      </mat-tab>
      <mat-tab label="Statistics">
        <app-stock-statistics
          [hidden]="isLoadingStock"
          [data]="stock$ | async"
        ></app-stock-statistics>
        <mat-spinner
          class="StockInfo-spinner"
          *ngIf="isLoadingStock"
          [color]="'accent'"
          [diameter]="50"
        ></mat-spinner>
      </mat-tab>
      <mat-tab label="News">
        <app-stock-news [hidden]="isLoadingNews" [stockNews]="news$ | async">
        </app-stock-news>
        <mat-spinner
          class="StockInfo-spinner"
          *ngIf="isLoadingNews"
          [color]="'accent'"
          [diameter]="50"
        ></mat-spinner>
      </mat-tab>
    </mat-tab-group>
  `,
  selector: "app-stock-info",
  styleUrls: ["./stock-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockInfoComponent implements OnInit {
  @Input() stockDetailSearch$: Rx.Observable<StockDetailSearch>;
  @Output() close = new EventEmitter<boolean>();

  news$: Rx.Observable<StockNewsList>;
  stock$: Rx.Observable<any>;

  isLoadingNews = true;
  isLoadingStock = true;

  constructor(
    private cd: ChangeDetectorRef,
    private stocksService: StocksService
  ) {}

  ngOnInit() {
    const stockDetailSearch$: Rx.Observable<
      StockDetailSearch
    > = this.stockDetailSearch$.pipe(
      filter(isDefined),
      distinctUntilChanged(),
      debounceTime(200)
    );

    this.stock$ = stockDetailSearch$.pipe(
      tap(() => {
        this.isLoadingStock = true;
        this.cd.detectChanges();
      }),
      switchMap(stockDetailSearch =>
        this.stocksService.getByStockSymbol(stockDetailSearch.symbol)
      ),
      tap(() => {
        this.isLoadingStock = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );

    this.news$ = stockDetailSearch$.pipe(
      tap(() => {
        this.isLoadingNews = true;
        this.cd.detectChanges();
      }),
      switchMap(stockDetailSearch =>
        this.stocksService.getNewsByStockSymbol(
          stockDetailSearch.symbol,
          stockDetailSearch.date
        )
      ),
      tap(() => {
        this.isLoadingNews = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );
  }

  getDate(date: string) {
    return moment(date).format("dddd MMMM D, YYYY");
  }

  onClose() {
    this.close.emit(true);
  }
}
