import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { StockList } from "./stocks.service.types";

@Injectable({
  providedIn: "root"
})
export class StocksService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Rx.Observable<StockList> {
    return this.httpClient
      .get("./assets/stocks.json")
      .pipe(map((response: StockList) => response)); // literally does nothing, bypass TS error
  }

  public getByStockSymbol(symbol: string): Rx.Observable<any | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-detail/${symbol}`)
      .pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;
          }

          return undefined;
        })
      );
  }

  public getNewsByStockSymbol(symbol: string): Rx.Observable<any | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-news/${symbol}`)
      .pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;
          }

          return undefined;
        })
      );
  }
}
