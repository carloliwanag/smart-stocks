import { Component, Input } from "@angular/core";
import * as moment from "moment";

@Component({
  template: `
    <mat-list class="StockNews">
      <ng-container *ngIf="stockNews">
        <mat-list-item *ngFor="let news of stockNews; last as last">
          <p class="StockNews-title" matLine>{{ news.title }}</p>
          <p class="StockNews-date" matLine>
            Posted at {{ getDate(news.date) }}
          </p>
          <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
        </mat-list-item>
      </ng-container>
      <ng-container *ngIf="!stockNews">
        <mat-list-item>No entries found</mat-list-item>
      </ng-container>
    </mat-list>
  `,
  selector: "app-stock-news",
  styleUrls: ["./stock-news.component.scss"]
})
export class StockNewsComponent {
  @Input() stockNews: any;

  getDate(date: string) {
    return moment(date).format("dddd MMMM D, YYYY");
  }
}
