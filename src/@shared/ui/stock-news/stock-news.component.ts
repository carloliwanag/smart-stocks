import { Component, Input } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  template: `
    <mat-list class="StockNews">
      <ng-container *ngIf="stockData$ as stock">        
          <mat-list-item *ngFor="let news of stock.news; last as last">            
            <h4>{{news.title}} ({{news.date}}) </h4>                        
            <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
          </mat-list-item>        
      </ng-container>
      <ng-container *ngIf="!(stockData$)">
        <mat-list-item>No entries found</mat-list-item>
      </ng-container>
    </mat-list>
  `,
  selector: "app-stock-news",
  styleUrls: ["./stock-news.component.scss"]
})
export class StockNewsComponent {
  @Input() stockData$: any;
  
}
