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
  selector: "app-stock-detail",
  templateUrl: "./stock-detail.component.html",
  styleUrls: ["./stock-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDetailComponent implements OnChanges {
  @Input() chartData;

  view: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Date";
  showYAxisLabel = true;
  yAxisLabel = "Open Low High";
  timeline = true;

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  openLowHigh: any[] = [];

  volume: any[] = [];

  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  barChartOptions: any;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData && this.chartData) {
      // do something
      this.createOpenLowHighData();
      this.createVolume();
      this.cd.detectChanges();
    }
  }

  createOpenLowHighData() {
    if (this.chartData) {
      // let open = this.chartData.historical_details.map(historicalDetail => {
      //   return {
      //     name: historicalDetail.fetchdate,
      //     value: historicalDetail.Open
      //   };
      // });

      // let low = this.chartData.historical_details.map(historicalDetail => {
      //   return {
      //     name: historicalDetail.fetchdate,
      //     value: historicalDetail.Low
      //   };
      // });

      // let high = this.chartData.historical_details.map(historicalDetail => {
      //   return {
      //     name: historicalDetail.fetchdate,
      //     value: historicalDetail.High
      //   };
      // });

      const historicData = this.chartData.historical_details;
      // this.openLowHigh = [
      //   {
      //     name: "Open",
      //     series: this.sortByKey(open, "name")
      //   },
      //   {
      //     name: "Low",
      //     series: this.sortByKey(low, "name")
      //   },
      //   {
      //     name: "High",
      //     series: this.sortByKey(high, "name")
      //   }
      // ];

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
        }
      ];

      this.lineChartLabels = historicData
        .map(details => details.fetchdate)
        .reverse();
      this.lineChartOptions = {
        responsive: true
      };
    }
  }

  createVolume() {
    if (this.chartData) {
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

      // let volume = this.chartData.historical_details.map(historicalDetail => {
      //   return {
      //     name: historicalDetail.fetchdate,
      //     value: historicalDetail.Volume
      //   };
      // });

      // this.volume = volume;

      // console.log(this.volume);
    }
  }

  
}
