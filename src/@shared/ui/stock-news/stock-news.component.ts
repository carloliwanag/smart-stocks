import { Component, OnInit } from "@angular/core";
import { StocksService } from "@shared/services";

@Component({
  template: `
    <mat-list class="Stock-news">
      <mat-list-item *ngFor="let news of stockNews; last as last">
        <p>{{ news }}</p>
        <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
      </mat-list-item>
    </mat-list>
  `,
  selector: "app-stock-news",
  styleUrls: ["./stock-news.component.scss"]
})
export class StockNewsComponent implements OnInit {
  stockCode: string = "GOOG";

  stockNews: any[] = [];

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    if (this.stockCode) {
      this.stockService
        .getNewsByStockSymbol(this.stockCode)
        .toPromise()
        .then(data => {
          this.stockNews = data.TOP_NEWS;
        });
    }
  }
}
