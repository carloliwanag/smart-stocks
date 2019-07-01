import { isDefined } from "@angular/compiler/src/util";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { MatTabChangeEvent } from "@angular/material";
import {
  FOIAList,
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
  map,
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
    <mat-tab-group
      [dynamicHeight]="true"
      (selectedTabChange)="tabChanged($event)"
    >
      <mat-tab label="Social">
        <app-stock-social
          *ngIf="!isLoadingSocial && socialData"
          [data]="socialData"
          [isDisplayed]="selectedTab === 0"
        ></app-stock-social>
        <mat-spinner
          class="StockInfo-spinner"
          *ngIf="isLoadingSocial"
          [color]="'accent'"
          [diameter]="50"
        ></mat-spinner>
      </mat-tab>
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
      <mat-tab label="FOIA">
        <app-stock-foia
          [hidden]="isLoadingFoia"
          [foia]="foia$ | async"
        ></app-stock-foia>
        <mat-spinner
          class="StockInfo-spinner"
          *ngIf="isLoadingFoia"
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
export class StockInfoComponent implements OnInit, OnDestroy {
  @Input() stockDetailSearch$: Rx.Observable<StockDetailSearch>;
  @Output() close = new EventEmitter<boolean>();

  news$: Rx.Observable<StockNewsList>;
  stock$: Rx.Observable<any>;
  social$: Rx.Observable<any>;
  foia$: Rx.Observable<FOIAList>;
  volumeChatter$: Rx.Observable<any>;
  isLoadingFoia = true;
  isLoadingNews = true;
  isLoadingSocial = true;
  isLoadingStock = true;
  selectedTab = 0;
  socialData: any;
  volumeChatterData: any;
  private socialDataSubscription: Rx.Subscription;
  private volumeChatterSub: Rx.Subscription;

  isLoadingVolumeChatter: boolean;

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

    this.foia$ = stockDetailSearch$.pipe(
      tap(() => {
        this.isLoadingFoia = true;
        this.cd.detectChanges();
      }),
      switchMap(stockDetailSearch =>
        this.stocksService.getFOIARequestBySymbol(stockDetailSearch.symbol)
      ),
      tap(() => {
        this.isLoadingFoia = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );

    this.social$ = stockDetailSearch$.pipe(
      tap(() => {
        this.isLoadingSocial = true;
        this.cd.detectChanges();
      }),
      switchMap(stockDetailSearch =>
        Rx.zip(
          this.stocksService.getWordCloudData(
            stockDetailSearch.symbol,
            stockDetailSearch.date
          )
        ).pipe(map(([wordCloud]) => ({ wordCloud })))
      ),
      tap(() => {
        this.isLoadingSocial = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );

    this.volumeChatter$ = stockDetailSearch$.pipe(
      tap(() => {
        this.isLoadingVolumeChatter = true;
        this.cd.detectChanges();
      }),
      switchMap(stockDetailSearch => {
        return this.stocksService.getVolumeChatter(
            stockDetailSearch.symbol,
            stockDetailSearch.date
          );
      }),
      tap(() => {
        this.isLoadingVolumeChatter = false;
        this.cd.detectChanges();
      }),
      publishReplay(1),
      refCount()
    );

    /**
     * Hack for angular cloud word component wherein it stupidly tries to redraw
     * the words by checking if a word can fit a particular DOM element even if
     * its parent container has a height or width of zero which results into an
     * infinite loop.
     *
     * Solution was to subscribe and check if the tab content is
     * rendered so we can display the word cloud properly.
     */
    this.socialDataSubscription = this.social$.subscribe(result => {
      this.socialData = result;
    });

    this.volumeChatterSub = this.volumeChatter$.subscribe(result => {
      this.volumeChatterData = result;
    });
  }

  ngOnDestroy() {
    if (this.socialDataSubscription) {
      this.socialDataSubscription.unsubscribe();
    }

    if(this.volumeChatterSub) {
      this.volumeChatterSub.unsubscribe();
    }
  }

  getDate(date: string) {
    return moment(date).format("dddd MMMM D, YYYY");
  }

  onClose() {
    this.close.emit(true);
  }

  tabChanged($event: MatTabChangeEvent) {
    this.selectedTab = $event.index;
    this.cd.detectChanges();
  }
}
