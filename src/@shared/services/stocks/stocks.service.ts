import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import {
  ChatterVolumeList,
  Contact,
  ContactResult,
  EventsMapList,
  EventsMapResult,
  FOIAList,
  FOIAResult,
  StockList,
  StockNamesResult,
  StockNewsList,
  StockSearchList,
  StockSentimentResult,
  StockSentiments,
  StockWordCloud,
  StockWordCloudResult
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
    symbol: string,
    date: string = undefined
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
    symbol: string,
    date: string = undefined
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

  public getWordCloudData(
    symbol: string,
    date: string
  ): Rx.Observable<StockWordCloud | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-wc/${symbol}?date=${date}`)
      .pipe(
        map((response: StockWordCloudResult) => {
          return response.data || undefined;
        })
      );
  }

  public getEventsMap(
    symbol: string
  ): Rx.Observable<EventsMapList | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-map/${symbol}`)
      .pipe(
        map((response: EventsMapResult) => {
          return response.data.result || undefined;
        })
      );
  }

  public getVolumeChatter(
    symbol: string,
    date: string
  ): Rx.Observable<ChatterVolumeList | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/stock-volume-chatter/${symbol}?date=${date}`)
      .pipe(
        map((response: any) => {
          if (
            !response.data ||
            !response.data.result ||
            response.data.result.length <= 0
          ) {
            return undefined;
          }

          return response.data.result.map(chatterVolume => ({
            date: chatterVolume.date,
            total_likes: parseInt(chatterVolume.total_likes, 10),
            total_retweets: parseInt(chatterVolume.total_retweets, 10)
          }));
        })
      );
  }

  public getContactBySymbol(
    symbol: string,
    date: string = undefined
  ): Rx.Observable<Contact | undefined> {
    return this.httpClient
      .get(`${environment.API_URL}/contact/${symbol}`)
      .pipe(map((response: ContactResult) => response.data || undefined));
  }
}
