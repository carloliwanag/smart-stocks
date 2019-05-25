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
    <app-stock-detail
      *ngIf="stockData && stockName"
      [chartData]="stockData"
      [stockName]="stockName"
    ></app-stock-detail>
    <div *ngIf="!stockData">Stock doesn't exist!</div>
  `,
  selector: "app-stock-search",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSearchComponent implements OnInit {
  stockCode: FormControl;
  stockData: any;
  stockName: string;

  constructor(
    private stocksService: StocksService,
    private cd: ChangeDetectorRef
  ) {
    this.stockCode = new FormControl();
  }

  ngOnInit() {
    this.searchStock("GOOG");
  }

  onSearch() {
    this.searchStock(this.stockCode.value);
  }

  private searchStock(stockSymbol: string) {
    this.stockName = stockSymbol;
    this.stocksService
      .getByStockSymbol(stockSymbol)
      .toPromise()
      .then(response => {
        this.stockData = response;
        this.cd.detectChanges();
      });
  }
}
