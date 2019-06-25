import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { StockWordCloud } from "@shared/services/stocks";
import { CloudData } from "angular-tag-cloud-module";

@Component({
  template: `
    <section class="StockWordCloud">
      <angular-tag-cloud
        [data]="cloudData"
        [height]="height"
        [width]="width"
        [strict]="false"
        [realignOnResize]="false"
        [overflow]="false"
      ></angular-tag-cloud>
    </section>
  `,
  selector: "app-stock-word-cloud",
  styleUrls: ["./stock-word-cloud.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockWordCloudComponent implements OnChanges {
  @Input() width: number = 1;
  @Input() height: number = 180;
  @Input() data: StockWordCloud;

  cloudData: CloudData[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      const data = Object.keys(this.data).map((key, index) => ({
        text: key,
        weight: parseInt(this.data[key]),
        color: this.getRandomLightColor()
      }));

      if (data.length > 0) {
        this.cloudData = data;
      }
    }
  }

  private getRandomLightColor(): string {
    const hue = 360 * Math.random();
    const saturation = `${50 + 10 * Math.random()}%`;
    const lightness = `${65 + 10 * Math.random()}%`;
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  }
}
