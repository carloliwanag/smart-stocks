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
        [datasets]="barChartData"
        [labels]="barChartLabels"
        [options]="barChartOptions"
        [chartType]="'bar'"
      >
      </canvas>
    </section>
  `,
  selector: "app-stock-volume-graph",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockVolumeGraphComponent implements OnChanges {
  @Input() chartData;

  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  barChartOptions: any;

  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData) {
      const historicData = this.chartData.historical_details;
      this.barChartData = [
        {
          data: historicData.map(details => details.Volume).reverse(),
          label: "Volume"
        }
      ];

      this.barChartLabels = historicData
        .map(details => details.fetchdate)
        .reverse();
      this.barChartOptions = {
        responsive: true
      };

      this.cd.detectChanges();
    }
  }
}
