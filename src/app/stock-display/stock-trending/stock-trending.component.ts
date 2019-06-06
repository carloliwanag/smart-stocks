import { Component, Input } from "@angular/core";

@Component({
  template: `
    <mat-card class="StockTrending">
      <ng-container *ngIf="!busy">
        <mat-card-header>
          <mat-card-title>
            {{ (stock$ | async)?.stock_code }} Historical Details
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-stock-detail [stockData$]="stock$"></app-stock-detail>
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
  @Input() stock$: any;
}
