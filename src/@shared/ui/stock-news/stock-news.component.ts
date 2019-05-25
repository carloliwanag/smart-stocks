import { Component, Input } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  template: `
    <mat-list class="Stock-news">
      <ng-container *ngIf="stockData$ | async as stockNews">
        <mat-list-item *ngFor="let news of stockNews; last as last">
          <p>{{ news }}</p>
          <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
        </mat-list-item>
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
