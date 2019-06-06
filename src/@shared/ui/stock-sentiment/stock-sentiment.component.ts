import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  template: `
    <section class="StockDetail">
      <ng-container *ngIf="stockData$ | async as data">
        <app-stock-trend-graph
          *ngIf="data.historical_details"
          [chartData]="data"
        ></app-stock-trend-graph>
      </ng-container>
      <ng-container *ngIf="!(stockData$ | async)">
        <div>No results found</div>
      </ng-container>
    </section>
  `,
  selector: "app-stock-sentiment",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSentimentComponent {
  @Input() stockData$: Rx.Observable<any | undefined>;
}
