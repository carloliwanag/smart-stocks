import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { StockSearch, StockSearchList, StocksService } from "@shared/services";
import * as Rx from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap
} from "rxjs/operators";

@Component({
  template: `
    <form searchForm="ngForm">
      <mat-form-field
        placeholder="Search"
        class="mat-search_field"
        [@slideInOut]="searchVisible"
      >
        <input
          #input
          matInput
          type="text"
          [formControl]="searchText"
          [matAutocomplete]="auto"
          value="GOOG"
        />

        <mat-autocomplete
          autoActiveFirstOption
          #auto="matAutocomplete"
          (optionSelected)="selectStock($event.option.value)"
        >
          <ng-container *ngIf="!isLoading">
            <mat-option
              matTooltip="{{ stock.company_name }}"
              matTooltipPosition="right"
              *ngFor="let stock of stockList"
              [value]="stock.ticker"
            >
              {{ stock.ticker }}
            </mat-option>
          </ng-container>
          <mat-option *ngIf="isLoading" disabled>Loading ...</mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <span
        class="mat-search_icons"
        [class.mat-search_icons--active]="searchVisible"
      >
        <mat-icon class="mat-search_icon-close" (click)="close()" matRipple
          >close</mat-icon
        >
        <mat-icon class="mat-search_icon-search" (click)="open()" matRipple
          >search</mat-icon
        >
      </span>
    </form>
  `,
  selector: "app-nav-search",
  styleUrls: ["./nav-search.component.scss"],
  animations: [
    trigger("slideInOut", [
      state("true", style({ width: "*" })),
      state("false", style({ width: "0" })),
      transition("true => false", animate("300ms ease-in")),
      transition("false => true", animate("300ms ease-out"))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSearchComponent implements OnInit, OnDestroy {
  @Output() onBlur = new EventEmitter<StockSearch>();

  @ViewChild("input") inputElement: ElementRef;

  isLoading = false;
  stockList: StockSearchList = [];
  searchText = new FormControl();
  searchText$: Rx.Observable<any>;
  searchVisible = true;

  private searchTextSubscription: Rx.Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private stocksService: StocksService
  ) {}

  ngOnInit() {
    this.searchText$ = this.searchText.valueChanges.pipe(
      filter((searchString: string) => searchString && searchString.length > 2),
      distinctUntilChanged(),
      debounceTime(500),
      tap(resp => {
        this.isLoading = true;
        this.stockList = [];
        this.cd.detectChanges();
      }),
      switchMap(searchString =>
        this.stocksService.getSearchStocksBySymbol(searchString)
      ),
      tap(() => {
        this.isLoading = false;
      })
    );

    this.searchTextSubscription = this.searchText$.subscribe(stocks => {
      this.stockList = stocks;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.searchTextSubscription) {
      this.searchTextSubscription.unsubscribe();
    }
  }

  close() {
    this.searchText.setValue("");
    this.searchVisible = false;
  }

  open() {
    this.searchVisible = true;
    this.inputElement.nativeElement.focus();
  }

  selectStock(stockCode: string) {
    const stock = this.stockList.find(stock => stock.ticker === stockCode);

    if (stock) {
      this.onBlur.emit(stock);
    }
  }
}
