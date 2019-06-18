import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  template: `
    <section class="StockChatterVolumeColumn">
      <span class="StockChatterVolumeColumn-day">{{ day }}</span>
      <span
        *ngIf="percentage"
        class="StockChatterVolumeColumn-percentage"
        [ngClass]="{ 'StockChatterVolumeColumn-low': percentage < 0 }"
      >
        {{ math.abs(percentage) }}%
      </span>
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
export class StockChatterVolumeColumnComponent implements OnChanges {
  @Input() day: string;
  @Input() percentage: number;
  @Input() data: string[];

  chartDataSet: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;
  math = Math;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.chartDataSet = [
        {
          data: this.data.map(item => parseInt(item, 10)),
          backgroundColor: "#487bce",
          hoverBackgroundColor: "#5287dd"
        }
      ];
      this.chartLabels = this.data;
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
}
