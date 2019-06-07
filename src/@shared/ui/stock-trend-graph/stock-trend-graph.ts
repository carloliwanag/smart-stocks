import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Label } from "ng2-charts";

const DEFAULT_FONT_COLOR = "#ccc";
const LOW_VOLUME_COLOR = "#d9534f";
const HIGH_VOLUME_COLOR = "#5cb85c";
const LOW_SENTIMENT_COLOR = "rgba(226, 112, 108, 1)"; //"#e2706c";
const HIGH_SENTIMENT_COLOR = "rgba(84, 206, 123, 1)"; //"#54ce7b";
const BUBBLE_RADIUS_SMALL = 4;
const BUBBLE_RADIUS_HIGH = 8;
const BUBBLE_RADIUS_DEFAULT = 6;

@Component({
  template: `
    <section>
      <canvas
        #chart
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
  @ViewChild("chart") canvas: ElementRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData && changes.chartData.currentValue) {
      const gradient = this.canvas.nativeElement
        .getContext("2d")
        .createLinearGradient(0, 0, 300, 500);
      const historicData = this.chartData.historical_details.reverse();
      const volumeData = historicData.map(details => details.Volume);
      const lowData = historicData.map(details =>
        parseFloat(details.Low).toFixed(2)
      );
      const volumeBackgroundColor = [];
      const sentimentBackgroundColor = [];
      const sentimentRadius = [];
      const generalSentimentColor = [];
      let maxVolume = 0;

      this.chartLabels = historicData.map(details => details.fetchdate);

      lowData.reduce((prev, cur) => {
        const previous = parseInt(prev, 10);
        const current = parseInt(cur, 10);

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

      const news = this.chartData.news
        .map(element => {
          const dateIndex = this.chartLabels.findIndex(
            date => date === element.date
          );

          if (dateIndex !== -1) {
            return {
              x: this.chartLabels[dateIndex],
              y: lowData[dateIndex],
              r: sentimentRadius[dateIndex],
              value: element.title,
              label: "News",
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

      const generalSentiments = this.chartLabels.map((label, index) => {
        const dateFoundIndex = this.chartData.general_sentiment.findIndex(
          item => label === item.date
        );
        const value =
          dateFoundIndex !== -1
            ? this.chartData.general_sentiment[dateFoundIndex].overall_sentiment
            : 0;

        generalSentimentColor.push(
          value < 0 ? LOW_SENTIMENT_COLOR : HIGH_SENTIMENT_COLOR
        );

        console.log(index / this.chartLabels.length);

        gradient.addColorStop(
          (index / this.chartLabels.length).toString(),
          value < 0 ? LOW_SENTIMENT_COLOR : HIGH_SENTIMENT_COLOR
        );

        return value;
      });

      // const generalSentiments = this.chartData.general_sentiment
      //   .map(element => {
      //     const dateIndex = this.chartLabels.findIndex(
      //       date => date === element.date
      //     );

      //     if (dateIndex !== -1) {
      //       sentimentBackgroundColor.push(
      //         parseInt(element.overall_sentiment) < 0
      //           ? LOW_SENTIMENT_COLOR
      //           : HIGH_SENTIMENT_COLOR
      //       );

      //       return {
      //         x: this.chartLabels[dateIndex],
      //         y: lowData[dateIndex] - (Math.floor(Math.random() * 10) + 5),
      //         r: BUBBLE_RADIUS_SMALL,
      //         value: element.overall_sentiment,
      //         label: "Sentiment",
      //         title: this.chartLabels[dateIndex]
      //       };
      //     }
      //   })
      //   .filter(item => typeof item !== "undefined");

      // const specialSentiments = this.chartData.special_sentiment_102
      //   .map(element => {
      //     const dateIndex = this.chartLabels.findIndex(
      //       date => date === element.date
      //     );

      //     if (dateIndex !== -1) {
      //       sentimentBackgroundColor.push(
      //         parseInt(element.overall_sentiment) < 0
      //           ? LOW_SENTIMENT_COLOR
      //           : HIGH_SENTIMENT_COLOR
      //       );

      //       return {
      //         x: this.chartLabels[dateIndex],
      //         y: lowData[dateIndex] - (Math.floor(Math.random() * 10) + 5),
      //         r: BUBBLE_RADIUS_SMALL,
      //         value: element.overall_sentiment,
      //         label: "Sentiment",
      //         title: this.chartLabels[dateIndex]
      //       };
      //     }
      //   })
      //   .filter(item => typeof item !== "undefined");

      // const newsSentiments = this.chartData.news_sentiment
      //   .map(element => {
      //     const dateIndex = this.chartLabels.findIndex(
      //       date => date === element.date
      //     );

      //     if (dateIndex !== -1) {
      //       sentimentBackgroundColor.push(
      //         parseInt(element.overall_sentiment) < 0
      //           ? LOW_SENTIMENT_COLOR
      //           : HIGH_SENTIMENT_COLOR
      //       );

      //       return {
      //         x: this.chartLabels[dateIndex],
      //         y: lowData[dateIndex] - (Math.floor(Math.random() * 10) + 5),
      //         r: BUBBLE_RADIUS_SMALL,
      //         value: element.overall_sentiment,
      //         label: "Sentiment",
      //         title: this.chartLabels[dateIndex]
      //       };
      //     }
      //   })
      //   .filter(item => typeof item !== "undefined");

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
          data: news,
          type: "bubble",
          label: "News",
          backgroundColor: "#ddd763",
          borderColor: "#eae475",
          hoverBackgroundColor: "#ddd763",
          hoverBorderColor: "#eae475"
        },
        // {
        //   data: generalSentiments,
        //   type: "bubble",
        //   pointStyle: "rect",
        //   label: "General Sentiments",
        //   backgroundColor: sentimentBackgroundColor,
        //   borderColor: "#fff",
        //   hoverBackgroundColor: sentimentBackgroundColor,
        //   hoverBorderColor: "#fff"
        // },
        // {
        //   data: specialSentiments,
        //   type: "bubble",
        //   pointStyle: "triangle",
        //   label: "Special Sentiments",
        //   backgroundColor: sentimentBackgroundColor,
        //   borderColor: "#fff",
        //   hoverBackgroundColor: sentimentBackgroundColor,
        //   hoverBorderColor: "#fff"
        // },
        // {
        //   data: newsSentiments,
        //   type: "bubble",
        //   pointStyle: "rectRot",
        //   label: "News Sentiments",
        //   backgroundColor: sentimentBackgroundColor,
        //   borderColor: "#fff",
        //   hoverBackgroundColor: sentimentBackgroundColor,
        //   hoverBorderColor: "#fff"
        // },
        {
          data: lowData,
          label: "Price",
          type: "line",
          yAxisID: "y-axis-0",
          pointRadius: 3,
          backgroundColor: "#3470d3",
          borderColor: "#5589e0",
          hoverBackgroundColor: "#3470d3",
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
        },
        {
          data: generalSentiments,
          label: "General Sentiments",
          type: "line",
          yAxisID: "y-axis-0",
          //fill: true,
          backgroundColor: generalSentimentColor,
          showLine: true,
          pointRadius: 1
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
                beginAtZero: true,
                fontColor: DEFAULT_FONT_COLOR,
                min: -450
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
              const activeItem = data.datasets[datasetIndex];

              switch (activeItem.type) {
                case "bubble":
                  return (activeItem.data[index] as any).title;
                default:
                  return toolTip.xLabel;
              }
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
        }
      };
      this.cd.detectChanges();
    }
  }
}
