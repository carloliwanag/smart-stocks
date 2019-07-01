import { ChangeDetectionStrategy, Component, OnInit, Input } from "@angular/core";

@Component({
  template: `
    <section
      class="StockChatterVolume"
      fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="16px"
      fxLayoutGap.xs="0"
    >
      <app-stock-chatter-volume-column
        *ngIf="dataFiveDays"
        [fxFlex]="'50%'"
        [day]="'5 day'"
        [data]="dataFiveDays"
        [percentage]="-2"
      >
      </app-stock-chatter-volume-column>
      <app-stock-chatter-volume-column
        *ngIf="dataToday"
        [fxFlex]="'50%'"
        [day]="'Today'"
        [data]="dataToday"
        [percentage]="5"
      >
      </app-stock-chatter-volume-column>
    </section>
  `,
  selector: "app-stock-chatter-volume-graph",
  styleUrls: ["./stock-chatter-volume.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockChatterVolumeGraphComponent implements OnInit {

  @Input() volumeChatter: any[];

  dataToday: string[];
  dataFiveDays: string[];

  ngOnInit() {

    // data only available for today only
    if (this.volumeChatter && this.volumeChatter.length > 0) {
      if (this.volumeChatter.length <= 5) {
        this.dataToday = this.volumeChatter.map(vc => ''+(+vc.total_likes + +vc.total_retweets));
      } else {
        this.dataToday = this.volumeChatter.slice(0,4).map(vc => ''+(+vc.total_likes + +vc.total_retweets));
        this.dataFiveDays = this.volumeChatter.slice(5,9).map(vc => ''+(+vc.total_likes + +vc.total_retweets));
      }
    }
  }
}
