import { 
  Input, 
  Component, 
  ChangeDetectionStrategy, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';

@Component({  
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Open Low High';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  openLowHigh: any[] = [];

  volume:any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData && this.chartData) {
      // do something       
      this.createOpenLowHighData();
      this.createVolume();
    }
  }

  createOpenLowHighData() {
    if (this.chartData) {
      let open = this.chartData.historical_details.map(historicalDetail => {
        return {
          name: historicalDetail.fetchdate,
          value: historicalDetail.Open
        };
      });

      let low = this.chartData.historical_details.map(historicalDetail => {
        return {
          name: historicalDetail.fetchdate,
          value: historicalDetail.Low
        };
      });

      let high = this.chartData.historical_details.map(historicalDetail => {
        return {
          name: historicalDetail.fetchdate,
          value: historicalDetail.High
        };
      });

      this.openLowHigh = [
        {
          name: 'Open',
          series: this.sortByKey(open, 'name')
        },
        {
          name: 'Low',
          series: this.sortByKey(low, 'name')
        },
        {
          name: 'High',
          series: this.sortByKey(high, 'name')
        }
      ];      
    }
  }

  createVolume() {
    if (this.chartData) {
      let volume = this.chartData.historical_details.map(historicalDetail => {
        return {
          name: historicalDetail.fetchdate,
          value: historicalDetail.Volume
        };        
        
      });

      this.volume = volume;

      console.log(this.volume);
    }
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}