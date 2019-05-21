import { Input, Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StocksService } from '@shared/services';

@Component({
  template: `
    <input type="text" [formControl]="stockCode" />
    <button (click)="onSearch()">Search</button>
    <ng-container *ngIf="results">
      <p>Search results:</p>
      <div *ngFor="let result of results">
        {{ result.stock_symbol }} {{ result.stock_name }}
      </div>
    </ng-container>
  `,
  selector: 'app-stock-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockSearchComponent {
  results: Array<Object|undefined>;
  stockCode: FormControl;

  constructor(private stocksService: StocksService, private cd: ChangeDetectorRef) {
    this.stockCode = new FormControl();
  }

  onSearch() {
    this.stocksService
      .getByStockSymbol(this.stockCode.value)
      .toPromise()
      .then(response => {
        this.results = response;
        this.cd.detectChanges();
      });
  }
}