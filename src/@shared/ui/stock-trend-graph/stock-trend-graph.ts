import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

const DEFAULT_FONT_COLOR = "#ccc";
const LOW_VOLUME_COLOR = "#d9534f";
const HIGH_VOLUME_COLOR = "#5cb85c";
const BUBBLE_RADIUS_SMALL = 4;
const BUBBLE_RADIUS_HIGH = 8;
const BUBBLE_RADIUS_DEFAULT = 6;

@Component({
  template: `
    <section>
      <canvas
        #chart
        baseChart
        height="200px"
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

  @Output() clickData = new EventEmitter<string>();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild("chart") canvas: ElementRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData && changes.chartData.currentValue) {
      const historicData = [...this.chartData.historical_details].reverse();
      const volumeData = historicData.map(details => details.Volume);
      const lowData = historicData.map(details => parseFloat(details.Low));
      const volumeBackgroundColor = [];
      const sentimentRadius = [];
      let maxVolume = 0;

      this.chartLabels = historicData.map(details => details.fetchdate);

      lowData.reduce((prev, cur) => {
        const previous = prev;
        const current = cur;

        sentimentRadius.push(
          previous <= current ? BUBBLE_RADIUS_HIGH : BUBBLE_RADIUS_SMALL
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
              r: sentimentRadius[dateIndex],
              value: element.requestername,
              label: "Requester Name",
              title: this.chartLabels[dateIndex]
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
          backgroundColor: "#c6c0c0",
          borderColor: "#ede6e6",
          hoverBackgroundColor: "#c6c0c0",
          hoverBorderColor: "#ede6e6"
        },
        {
          data: lowData,
          label: "Price",
          type: "line",
          yAxisID: "y-axis-0",
          pointRadius: 3,
          backgroundColor: "#638bce",
          borderColor: "#5589e0",
          hoverBackgroundColor: "#638bce",
          hoverBorderColor: "#5589e0"
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
              },
              gridLines: {
                offsetGridLines: true
              }
            }
          ],
          yAxes: [
            {
              position: "left",
              id: "y-axis-0",
              ticks: {
                fontColor: DEFAULT_FONT_COLOR,
                beginAtZero: true
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
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              const toolTip = tooltipItem[0];
              const datasetIndex = toolTip.datasetIndex;
              const index = toolTip.index;

              return this.getDataPointDate(datasetIndex, index);
            },
            label: function(tooltipItem, data) {
              const datasetIndex = tooltipItem.datasetIndex;
              const index = tooltipItem.index;
              const activeItem = data.datasets[datasetIndex];

              switch (activeItem.type) {
                case "bubble":
                  return ` ${(activeItem.data[index] as any).label}: ${
                    (activeItem.data[index] as any).value
                  }`;
                default:
                  return ` ${activeItem.label}: ${activeItem.data[index]}`;
              }
            }
          }
        },
        onClick: () => {
          const selectedData = this.chart.chart.getElementAtEvent(event);

          if (selectedData.length > 0) {
            const item = selectedData[0] as any;
            this.clickData.emit(
              this.getDataPointDate(item._datasetIndex, item._index)
            );
          }
        }
      };
    }

    this.cd.detectChanges();
  }

  private getDataPointDate(datasetIndex, index): any {
    const activeItem = this.chart.datasets[datasetIndex];

    switch (activeItem.type) {
      case "bubble":
        return (activeItem.data[index] as any).title;
      default:
        return this.chart.labels[index];
    }
  }
}
