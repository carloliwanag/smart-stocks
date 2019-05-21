import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StockList } from './stocks.service.types';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Rx.Observable<StockList> {
    return this.httpClient
      .get("./assets/stocks.json")
      .pipe(map((response: StockList) => response)); // literally does nothing, bypass TS error
  }

  public getByStockSymbol(symbol: string): Rx.Observable<Array<Object|undefined>> {
    return this.getAll()
      .pipe(
        map(result => 
          result.data.filter(stock => (stock as any).stock_symbol === symbol))
        );
  }
}
