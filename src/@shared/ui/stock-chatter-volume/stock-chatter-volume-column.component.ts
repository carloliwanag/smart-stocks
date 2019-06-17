import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  template: `
    <section class="StockChatterVolumeColumn">
      <span class="StockChatterVolumeColumn-day">{{ day }}</span>
      <span class="StockChatterVolumeColumn-percentage">{{ percentage }}%</span>
      <canvas
        #chart
        baseChart
        height="80px"
        [datasets]="chartDataSet"
        [labels]="chartLabels"
        [options]="chartOptions"
        [chartType]="'bar'"
      >
      </canvas>
    </section>
  `,
  selector: "app-stock-chatter-volume-column",
  styleUrls: ["./stock-chatter-volume-column.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockChatterVolumeColumnComponent implements OnInit {
  @Input() day: string;
  @Input() percentage: string;

  chartDataSet: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;

  ngOnInit() {
    this.chartDataSet = [{ data: [1, 5, 2, 10, 3] }];
    this.chartLabels = ["1", "2", "3", "4", "5"];
    this.chartOptions = {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        gridLines: { display: false, lineWidth: 0 },
        xAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              lineWidth: 0
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              lineWidth: 0
            }
          }
        ]
      }
    };
  }
}
