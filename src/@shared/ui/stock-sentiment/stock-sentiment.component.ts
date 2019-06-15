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
  selector: "app-stock-sentiment-graph",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSentimentComponent implements OnChanges {
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
      this.chartLabels = historicData.map(details => details.fetchdate);

      const generalSentiments = this.chartLabels.map((label, index) => {
        const dateFoundIndex = this.chartData.general_sentiment.findIndex(
          item => label === item.date
        );
        const value =
          dateFoundIndex !== -1
            ? this.chartData.general_sentiment[dateFoundIndex].overall_sentiment
            : 0;
        return value;
      });

      const newsSentiments = this.chartLabels.map((label, index) => {
        const dateFoundIndex = this.chartData.news_sentiment.findIndex(
          item => label === item.date
        );
        return dateFoundIndex !== -1
          ? this.chartData.news_sentiment[dateFoundIndex].overall_sentiment
          : 0;
      });

      const specialSentiments = this.chartLabels.map((label, index) => {
        const dateFoundIndex = this.chartData.special_sentiment_102.findIndex(
          item => label === item.date
        );
        return dateFoundIndex !== -1
          ? this.chartData.special_sentiment_102[dateFoundIndex]
              .overall_sentiment
          : 0;
      });

      this.chartDataSet = [
        {
          data: generalSentiments,
          label: "General Sentiments",
          type: "line",
          // fill: true,
          showLine: true,
          pointRadius: 1,
          backgroundColor: "#c09ae2",
          borderColor: "#713ea0",
          hoverBackgroundColor: "#c09ae2",
          hoverBorderColor: "#713ea0"
        },
        {
          data: newsSentiments,
          label: "News Sentiments",
          type: "line",
          showLine: true,
          pointRadius: 1
        },
        {
          data: specialSentiments,
          label: "Special Sentiments",
          type: "line",
          showLine: true,
          pointRadius: 1,
          backgroundColor: "#ddd763",
          borderColor: "#eae475",
          hoverBackgroundColor: "#ddd763",
          hoverBorderColor: "#eae475"
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
              ticks: {
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
      this.cd.detectChanges();
    }
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
