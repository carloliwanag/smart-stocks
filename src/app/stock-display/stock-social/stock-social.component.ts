import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <section *ngIf="data && data.wordCloud">
      <app-stock-word-cloud [data]="data.wordCloud"></app-stock-word-cloud>
    </section>
  `,
  selector: "app-stock-social",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSocialComponent {
  @Input() data: any;
}
