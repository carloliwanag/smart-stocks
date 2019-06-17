import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <section
      class="StockChatterVolume"
      fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="32px"
      fxLayoutGap.xs="0"
    >
      <app-stock-chatter-volume-column
        [fxFlex]="'50%'"
        [day]="'5 day'"
        [percentage]="2"
      >
      </app-stock-chatter-volume-column>
      <app-stock-chatter-volume-column
        [fxFlex]="'50%'"
        [day]="'Today'"
        [percentage]="2"
      >
      </app-stock-chatter-volume-column>
    </section>
  `,
  selector: "app-stock-chatter-volume-graph",
  styleUrls: ["./stock-chatter-volume.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockChatterVolumeGraphComponent {}
