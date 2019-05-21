import { Input, Component, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  template: `
    <div></div>
  `,
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDetailComponent implements OnChanges {
  @Input() chartData;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData) {
      // do something here
    }
  }


}