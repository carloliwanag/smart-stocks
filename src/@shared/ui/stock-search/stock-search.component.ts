import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { StocksService } from "@shared/services";

@Component({
  template: `
    <input type="text" [formControl]="stockCode" />
    <button (click)="onSearch()">Search</button>
    <ng-container *ngIf="results">
      <div *ngFor="let result of results">
        <h1>{{ result.stock_symbol }} {{ result.stock_name }}</h1>
        <div>
          <app-stock-detail [chartData]="stockData"></app-stock-detail>
        </div>
      </div>
    </ng-container>
  `,
  selector: "app-stock-search",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSearchComponent implements OnInit {
  results: Array<Object | undefined>;
  stockCode: FormControl;
  stockData;

  constructor(
    private stocksService: StocksService,
    private cd: ChangeDetectorRef
  ) {
    this.stockCode = new FormControl();
  }

  ngOnInit() {
    this.stocksService
      .getAll()
      .toPromise()
      .then(response => {
        const initialValue = response.data[0];
        this.results = [initialValue];
        this.stockData = initialValue;
        this.cd.detectChanges();
      });
  }

  onSearch() {
    this.stocksService
      .getByStockSymbol(this.stockCode.value)
      .toPromise()
      .then(response => {
        this.results = response;
        if (this.results && this.results.length > 0) {
          this.stockData = this.results[0];
        }
        this.cd.detectChanges();
      });
  }
}
