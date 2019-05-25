import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <section *ngIf="chartData && stockName">
      <h1>{{ stockName }}</h1>
      <h2>Historical Details</h2>
      <app-stock-trend-graph
        *ngIf="chartData"
        [chartData]="chartData"
      ></app-stock-trend-graph>
      <app-stock-volume-graph
        *ngIf="chartData"
        [chartData]="chartData"
      ></app-stock-volume-graph>
    </section>
  `,
  selector: "app-stock-detail",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDetailComponent {
  @Input() stockName?: string;
  @Input() chartData?: any;
}
