import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <section
      class="StockSocial"
      fxLayout
      fxLayout.xs="column"
      fxLayoutAlign="center"
      fxLayoutGap="32px"
      fxLayoutGap.xs="0"
    >
      <div [fxFlex]="'50%'">
        <mat-card class="StockSocial-cardWrap">
          <mat-card-header>
            <mat-card-title class="StockSocial-cardTitle">
              Word Cloud
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="">
            <app-stock-word-cloud
              *ngIf="isDisplayed && data && data.wordCloud"
              [data]="data.wordCloud"
            >
            </app-stock-word-cloud>
          </mat-card-content>
        </mat-card>
      </div>
      <div [fxFlex]="'50%'">
        <mat-card class="StockSocial-cardWrap">
          <mat-card-header>
            <mat-card-title class="StockSocial-cardTitle">
              Chatter Volume
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-stock-chatter-volume-graph></app-stock-chatter-volume-graph>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  selector: "app-stock-social",
  styleUrls: ["./stock-social.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockSocialComponent {
  @Input() data: any;
  @Input() isDisplayed: false;
}
