import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ChatterVolumeList } from "@shared/services";

@Component({
  template: `
    <section
      *ngIf="volumeChatter"
      class="StockChatterVolume"
      fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="16px"
      fxLayoutGap.xs="0"
    >
      <app-stock-chatter-volume-column
        *ngIf="dataFiveDays.length > 0"
        [fxFlex]="'50%'"
        [day]="'5 day'"
        [data]="dataFiveDays"
        [percentage]="percentageFiveDays"
      >
      </app-stock-chatter-volume-column>
      <app-stock-chatter-volume-column
        *ngIf="dataToday.length > 0"
        [fxFlex]="'50%'"
        [day]="'Today'"
        [data]="dataToday"
        [percentage]="percentageToday"
      >
      </app-stock-chatter-volume-column>
    </section>
  `,
  selector: "app-stock-chatter-volume-graph",
  styleUrls: ["./stock-chatter-volume.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockChatterVolumeGraphComponent implements OnChanges {
  @Input() volumeChatter: ChatterVolumeList | undefined;

  dataFiveDays: number[];
  dataToday: number[];
  percentageFiveDays: number;
  percentageToday: number;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataToday = [];
    this.dataFiveDays = [];
    this.percentageFiveDays = 0;
    this.percentageToday = 0;

    if (changes.volumeChatter && changes.volumeChatter.currentValue) {
      this.dataToday = this.volumeChatter
        .slice(0, 4)
        .map(vc => vc.total_likes + vc.total_retweets);

      if (this.volumeChatter.length <= 10) {
        return this.computeIncompleteData(this.volumeChatter);
      }

      this.dataFiveDays = this.volumeChatter
        .slice(5, 9)
        .map(vc => vc.total_likes + vc.total_retweets);

      const sumToday = this.getDataSum(this.dataToday);
      const sumFiveDays = this.getDataSum(this.dataFiveDays);
      const sumTenDays = this.volumeChatter
        .slice(10, 14)
        .reduce(
          (prev, current) =>
            prev + current.total_likes + current.total_retweets,
          0
        );

      this.percentageToday = this.getPercentageChange(sumToday, sumFiveDays);
      this.percentageFiveDays = this.getPercentageChange(
        sumFiveDays,
        sumTenDays
      );
    }

    this.cd.detectChanges();
  }

  computeIncompleteData(data: ChatterVolumeList) {
    this.dataToday = this.volumeChatter
      .slice(0, 4)
      .map(vc => vc.total_likes + vc.total_retweets);

    if (this.volumeChatter.length === 1) {
      return;
    }

    if (this.volumeChatter.length <= 7) {
      if (this.dataToday[1] !== 0) {
        this.percentageToday = this.getPercentageChange(
          this.dataToday[0],
          this.dataToday[1]
        );
      }

      return;
    }

    this.dataFiveDays = this.volumeChatter
      .slice(5, 9)
      .map(vc => vc.total_likes + vc.total_retweets);

    const sumToday = this.getDataSum(this.dataToday);
    const sumFiveDays = this.getDataSum(this.dataFiveDays);

    this.percentageToday = this.getPercentageChange(sumToday, sumFiveDays);
    this.percentageFiveDays = this.getPercentageChange(
      this.dataFiveDays[0],
      this.dataFiveDays[1]
    );
  }

  getPercentageChange(newNumber: number, oldNumber: number): number {
    return Math.round(((newNumber - oldNumber) / oldNumber) * 100);
  }

  getDataSum(data: ReadonlyArray<number>): number {
    return data.reduce((prev, current) => prev + current, 0);
  }
}
