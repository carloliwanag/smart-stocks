import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  

  constructor(private httpClient: HttpClient) {}

  private getJSON(): Observable<any> {
    return this.httpClient.get("./assets/stocks.json");
  }

  queryAll() {
    return this.getJSON();
  }

}
