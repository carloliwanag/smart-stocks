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
        <app-stock-volume-graph
          *ngIf="data.historical_details"
          [chartData]="data"
        ></app-stock-volume-graph>
      </ng-container>
      <ng-container *ngIf="!(stockData$ | async)">
        <div>No results found</div>
      </ng-container>
    </section>
  `,
  selector: "app-stock-detail",
  styleUrls: ["./stock-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDetailComponent {
  @Input() stockData$: Rx.Observable<any | undefined>;
}
