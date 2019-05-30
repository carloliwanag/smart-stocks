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
import { StockNamesList, StocksService } from "@shared/services";
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
    <form searchForm="ngForm" (ngSubmit)="blurEvent()">
      <mat-form-field
        placeholder="Search"
        class="mat-search_field"
        [@slideInOut]="searchVisible"
      >
        <input
          #input
          matInput
          type="text"
          (blur)="blurEvent()"
          [formControl]="searchText"
          [matAutocomplete]="auto"
          value="GOOG"
        />

        <mat-autocomplete
          autoActiveFirstOption
          #auto="matAutocomplete"
          (optionSelected)="blurEvent()"
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
  @Output() onBlur = new EventEmitter<string>();

  @ViewChild("input") inputElement: ElementRef;

  isLoading = false;
  stockList: StockNamesList = [];
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
      debounceTime(500),
      distinctUntilChanged(),
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
    this.searchVisible = false;
  }

  open() {
    this.searchVisible = true;
    this.inputElement.nativeElement.focus();
  }

  blurEvent() {
    console.log(this.searchText.value);
    if (!this.searchText.value) {
      return this.close();
    }

    this.onBlur.emit(this.searchText.value);
  }
}
