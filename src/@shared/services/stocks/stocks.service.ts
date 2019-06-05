import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import {
  FOIAList,
  FOIAResult,
  StockList,
  StockNamesResult,
  StockNewsList,
  StockSearchList,
  StockSentimentResult,
  StockSentiments
} from "./stocks.service.types";

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

  public getNewsByStockSymbol(
    symbol: string
  ): Rx.Observable<StockNewsList | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-news/${symbol}`)
      .pipe(
        map((response: any) => {
          if (
            response &&
            response.data &&
            response.data.TOP_NEWS &&
            response.data.TOP_NEWS.length > 0
          ) {
            return response.data.TOP_NEWS.map((news: string) => {
              const [date, ...title] = news.split(" ");

              return {
                date,
                title: title.join(" "),
                url: ""
              };
            });
          }

          return undefined;
        })
      );
  }

  public getSearchStocksBySymbol(
    symbol: string
  ): Rx.Observable<StockSearchList | undefined> {
    return this.httpClient.get(`${environment.API_URL}/stock/${symbol}`).pipe(
      map((response: StockNamesResult) => {
        if (response.data.length > 0) {
          return response.data;
        }

        return undefined;
      })
    );
  }

  public getFOIARequestBySymbol(
    symbol: string
  ): Rx.Observable<FOIAList | undefined> {
    return this.httpClient.get(`${environment.API_URL}/foia/${symbol}`).pipe(
      map((response: FOIAResult) => {
        if (response.data.length > 0) {
          return response.data;
        }

        return undefined;
      })
    );
  }

  public getSentimentBySymbol(
    symbol: string
  ): Rx.Observable<StockSentiments | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-sentiment/${symbol}`)
      .pipe(
        map((response: StockSentimentResult) => {
          if (response.data.general_sentiment) {
            return response.data;
          }

          return undefined;
        })
      );
  }
}
