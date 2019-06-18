import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

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
        [fxFlex]="'50%'"
        [day]="'5 day'"
        [data]="dataFiveDays"
        [percentage]="-2"
      >
      </app-stock-chatter-volume-column>
      <app-stock-chatter-volume-column
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
  dataToday: string[];
  dataFiveDays: string[];

  ngOnInit() {
    this.dataToday = ["20", "3", "15", "6", "8"];
    this.dataFiveDays = ["20", "44", "23", "16", "8"];
  }
}
