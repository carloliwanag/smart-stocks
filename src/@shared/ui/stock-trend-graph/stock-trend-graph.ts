import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

const DEFAULT_FONT_COLOR = "#ccc";
const LOW_VOLUME_COLOR = "#d9534f";
const HIGH_VOLUME_COLOR = "#5cb85c";
const BUBBLE_RADIUS_SMALL = 5;
const BUBBLE_RADIUS_HIGH = 10;
const BUBBLE_RADIUS_DEFAULT = 8;

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
    if (changes.chartData && changes.chartData.currentValue) {
      const historicData = this.chartData.historical_details.reverse();
      const volumeData = historicData.map(details => details.Volume);
      const lowData = historicData.map(details => details.Low);
      const volumeBackgroundColor = [];
      const sentimentRadius = [];
      let maxVolume = 0;

      this.chartLabels = historicData.map(details => details.fetchdate);

      historicData
        .map(details => (details.Low + details.High) / 2)
        .reduce((prev, cur) => {
          sentimentRadius.push(
            prev <= cur ? BUBBLE_RADIUS_HIGH : BUBBLE_RADIUS_SMALL
          );

          if (sentimentRadius.length === historicData.length - 1) {
            sentimentRadius.push(BUBBLE_RADIUS_DEFAULT);
          }

          return cur;
        });

      const foia = this.chartData.foia
        .map(element => {
          const dateIndex = this.chartLabels.findIndex(
            date => date === element.receiveddate
          );

          if (dateIndex !== -1) {
            return {
              x: this.chartLabels[dateIndex],
              y: lowData[dateIndex],
              r: sentimentRadius[dateIndex]
            };
          }
        })
        .filter(item => typeof item !== "undefined");

      const news = this.chartData.news
        .map(element => {
          const dateIndex = this.chartLabels.findIndex(
            date => date === element.receiveddate
          );

          if (dateIndex !== -1) {
            return {
              x: this.chartLabels[dateIndex],
              y: lowData[dateIndex],
              r: sentimentRadius[dateIndex]
            };
          }
        })
        .filter(item => typeof item !== "undefined");

      volumeData.reduce((prev, cur) => {
        const previous = parseFloat(prev);
        const current = parseFloat(cur);

        // initial value
        if (volumeBackgroundColor.length <= 0) {
          volumeBackgroundColor.push(HIGH_VOLUME_COLOR);
          maxVolume = previous;
        }

        volumeBackgroundColor.push(
          current >= previous ? HIGH_VOLUME_COLOR : LOW_VOLUME_COLOR
        );

        if (maxVolume < current) {
          maxVolume = current;
        }

        return current;
      });

      this.chartDataSet = [
        {
          data: foia,
          type: "bubble",
          label: "FOIA",
          backgroundColor: "#fff",
          borderColor: "#fff",
          hoverBackgroundColor: "#fff",
          hoverBorderColor: "#fff"
        },
        {
          data: news,
          type: "bubble",
          label: "News"
        },
        {
          data: lowData,
          label: "Low",
          type: "line",
          yAxisID: "y-axis-0"
        },
        {
          data: historicData.map(details => details.High),
          label: "High",
          yAxisID: "y-axis-0",
          type: "line"
        },
        {
          data: volumeData,
          label: "Volume",
          yAxisID: "y-axis-1",
          backgroundColor: volumeBackgroundColor,
          hoverBackgroundColor: volumeBackgroundColor,
          borderColor: volumeBackgroundColor,
          hoverBorderColor: volumeBackgroundColor
        }
      ];

      this.chartOptions = {
        responsive: true,
        elements: {
          line: {
            fill: false
          }
        },
        legend: {
          labels: {
            fontColor: DEFAULT_FONT_COLOR
          }
        },
        title: {
          fontColor: DEFAULT_FONT_COLOR
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: DEFAULT_FONT_COLOR
              }
            }
          ],
          yAxes: [
            {
              position: "left",
              id: "y-axis-0",
              ticks: {
                beginAtZero: true,
                fontColor: DEFAULT_FONT_COLOR
              }
            },
            {
              position: "right",
              id: "y-axis-1",
              ticks: {
                max: Math.round(maxVolume * 2.5), // 100000000,
                beginAtZero: true,
                fontColor: DEFAULT_FONT_COLOR
              }
            }
          ]
        }
      };
      this.cd.detectChanges();
    }
  }
}
