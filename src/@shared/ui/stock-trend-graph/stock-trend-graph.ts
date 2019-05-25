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
  selector: "app-stock-trend-graph",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockTrendGraphComponent implements OnChanges {
  @Input() chartData;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData) {
      const historicData = this.chartData.historical_details;

      this.lineChartData = [
        {
          data: historicData.map(details => details.Open).reverse(),
          label: "Open"
        },
        {
          data: historicData.map(details => details.Low).reverse(),
          label: "Low"
        },
        {
          data: historicData.map(details => details.High).reverse(),
          label: "High"
        },
        {
          data: historicData.map(details => details.High).reverse(),
          label: "Close"
        }
      ];

      this.lineChartLabels = historicData
        .map(details => details.fetchdate)
        .reverse();
      this.lineChartOptions = {
        responsive: true
      };
      this.cd.detectChanges();
    }
  }
}
