import { Component, OnInit, Input } from '@angular/core';
import { StocksService } from '@shared/services';

@Component({
  selector: 'app-stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.scss']
})
export class StockNewsComponent implements OnInit {

  stockCode:string = 'GOOG';

  stockNews: any[] = [];

  constructor(private stockService: StocksService) { }

  ngOnInit() {
    if (this.stockCode) {      
      this.stockService.getNewsByStockSymbol(this.stockCode)
        .toPromise()
        .then((data) => {
          this.stockNews = data.TOP_NEWS;
        });
    }    
  }

}
