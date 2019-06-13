import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  template: `
    <mat-card class="StockSentiment">
      <ng-container *ngIf="!busy">
        <mat-card-header>
          <mat-card-title>
            Sentiments
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-stock-sentiment-graph
            *ngIf="stock?.historical_details"
            class="StockDisplay-components"
            [chartData]="stock"
            (clickData)="onClickData($event)"
          ></app-stock-sentiment-graph>
          <div *ngIf="!stock?.historical_details">
            No results found
          </div>
        </mat-card-content>
      </ng-container>
      <mat-spinner
        class="StockSentiment-spinner"
        *ngIf="busy"
        [color]="'accent'"
        [diameter]="50"
      ></mat-spinner>
    </mat-card>
  `,
  selector: "app-stock-sentiment",
  styleUrls: ["./stock-sentiment.component.scss"]
})
export class StockSentimentComponent {
  @Input() busy: boolean;
  @Input() stock: any;

  @Output() clickData = new EventEmitter<string>();

  onClickData(data: string) {
    this.clickData.emit(data);
  }
}
