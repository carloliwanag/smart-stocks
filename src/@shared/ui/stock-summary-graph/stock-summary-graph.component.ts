import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { ChartDataSets } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

@Component({
  template: `
    <section>
      <canvas
        baseChart
        width="300"
        height="200"
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [chartType]="'line'"
      >
      </canvas>
    </section>
  `,
  selector: "app-stock-summary-graph",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSummaryGraphComponent implements OnChanges {
  @Input() chartData;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData) {
      const data = this.chartData.summery;

      this.lineChartData = [
        {
          data: data.map(details => details.Sell).reverse(),
          label: "Sell"
        },
        {
          data: data.map(details => details.Buy).reverse(),
          label: "Buy"
        },
        {
          data: data.map(details => details["Strong Sell"]).reverse(),
          label: "Strong Sell"
        },
        {
          data: data.map(details => details["Strong Buy"]).reverse(),
          label: "Strong Buy"
        },
        {
          data: data.map(details => details.Hold).reverse(),
          label: "Hold"
        }
      ];

      this.lineChartLabels = data.map(details => details.Period).reverse();
      this.lineChartOptions = {
        responsive: true
      };
      this.cd.detectChanges();
    }
  }
}
