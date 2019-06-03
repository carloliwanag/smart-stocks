import { Component, Input } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  template: `
    <mat-list class="StockNews">
      <ng-container *ngIf="stockData$ | async as stock">
        <perfect-scrollbar class="StockNews-list">
          <mat-list-item *ngFor="let news of stock.news; last as last">
            <p>{{ news }}</p>
            <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
          </mat-list-item>
        </perfect-scrollbar>
      </ng-container>
      <ng-container *ngIf="!(stockData$ | async)">
        <mat-list-item>No entries found</mat-list-item>
      </ng-container>
    </mat-list>
  `,
  selector: "app-stock-news",
  styleUrls: ["./stock-news.component.scss"]
})
export class StockNewsComponent {
  @Input() stockData$: Rx.Observable<any | undefined>;
}
