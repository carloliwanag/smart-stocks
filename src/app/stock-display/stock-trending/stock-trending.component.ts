import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  template: `
    <mat-card class="StockTrending">
      <ng-container *ngIf="!busy">
        <mat-card-header>
          <mat-card-title>
            {{ stock?.stock_code }} Historical Details
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-stock-trend-graph
            *ngIf="stock?.historical_details"
            [chartData]="stock"
            (clickData)="onClickData($event)"
          ></app-stock-trend-graph>
          <div *ngIf="!stock?.historical_details">
            No results found
          </div>
        </mat-card-content>
      </ng-container>
      <mat-spinner
        class="StockTrending-spinner"
        *ngIf="busy"
        [color]="'accent'"
        [diameter]="50"
      ></mat-spinner>
    </mat-card>
  `,
  selector: "app-stock-trending",
  styleUrls: ["./stock-trending-component.scss"]
})
export class StockTrendingComponent {
  @Input() busy: boolean;
  @Input() stock: any;

  @Output() clickData = new EventEmitter<string>();

  onClickData(data: string) {
    this.clickData.emit(data);
  }
}
