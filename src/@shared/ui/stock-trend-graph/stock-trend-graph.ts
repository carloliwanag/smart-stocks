import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

const LOW_VOLUME_COLOR = "red";
const HIGH_VOLUME_COLOR = "green";

@Component({
  template: `
    <section>
      <canvas
        baseChart
        height="180px"
        [datasets]="chartDataSet"
        [labels]="chartLabels"
        [options]="chartOptions"
        [chartType]="'bar'"
      >
      </canvas>
    </section>
  `,
  selector: "app-stock-trend-graph",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockTrendGraphComponent implements OnChanges {
  @Input() chartData;

  chartDataSet: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData) {
      const historicData = this.chartData.historical_details;
      const volumeData = historicData.map(details => details.Volume).reverse();
      const volumeBackgroundColor = [];

      volumeData.reduce((prev, cur) => {
        const previous = parseFloat(prev);
        const current = parseFloat(cur);

        console.log(previous, current, previous > current);
        if (volumeBackgroundColor.length <= 0) {
          volumeBackgroundColor.push(
            previous >= current ? HIGH_VOLUME_COLOR : LOW_VOLUME_COLOR
          );
        }

        volumeBackgroundColor.push(
          current >= previous ? HIGH_VOLUME_COLOR : LOW_VOLUME_COLOR
        );
        return current;
      });

      this.chartDataSet = [
        {
          data: volumeData,
          label: "Volume",
          yAxisID: "y-axis-1",
          backgroundColor: volumeBackgroundColor,
          hoverBackgroundColor: volumeBackgroundColor,
          borderColor: volumeBackgroundColor,
          hoverBorderColor: volumeBackgroundColor
        },
        {
          data: historicData.map(details => details.Low).reverse(),
          label: "Low",
          type: "line",
          yAxisID: "y-axis-0"
        },
        {
          data: historicData.map(details => details.High).reverse(),
          label: "High",
          yAxisID: "y-axis-0",
          type: "line"
        }
      ];

      this.chartLabels = historicData
        .map(details => details.fetchdate)
        .reverse();
      this.chartOptions = {
        responsive: true,
        elements: {
          line: {
            fill: false
          }
        },
        legend: {
          labels: {
            fontColor: "#ccc"
          }
        },
        title: {
          fontColor: "#ccc"
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#ccc"
              }
            }
          ],
          yAxes: [
            {
              position: "left",
              id: "y-axis-0",
              ticks: {
                beginAtZero: true,
                fontColor: "#ccc"
              }
            },
            {
              position: "right",
              id: "y-axis-1",
              ticks: {
                max: 100000000,
                beginAtZero: false,
                fontColor: "#ccc"
              }
            }
          ]
        }
      };
      this.cd.detectChanges();
    }
  }
}
