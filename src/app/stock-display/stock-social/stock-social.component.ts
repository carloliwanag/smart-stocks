import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <section class="StockSocial">
      <section
        class="StockSocial-sections"
        fxLayout
        fxLayout.xs="column"
        fxLayoutAlign="center"
        fxLayoutGap="32px"
        fxLayoutGap.xs="0"
      >
        <div [fxFlex]="'50%'">
          <div class="StockSocial-cardTitle">
            Word Cloud
          </div>
          <mat-card class="StockSocial-cardWrap">
            <mat-card-content>
              <app-stock-word-cloud
                *ngIf="isDisplayed && data && data.wordCloud"
                [data]="data.wordCloud"
              >
              </app-stock-word-cloud>
            </mat-card-content>
          </mat-card>
        </div>
        <div [fxFlex]="'50%'">
          <div class="StockSocial-cardTitle">
            Chatter Volume
          </div>
          <mat-card class="StockSocial-cardWrap">
            <mat-card-content>
              <app-stock-chatter-volume-graph></app-stock-chatter-volume-graph>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <section
        class="StockSocial-sections"
        fxLayout
        fxLayout.xs="column"
        fxLayoutAlign="center"
        fxLayoutGap="32px"
        fxLayoutGap.xs="0"
      >
        <div [fxFlex]="'50%'">
          <div class="StockSocial-cardTitle">
            Positive Tweets
          </div>

          <app-twitter-card class="StockSocial-tweets"></app-twitter-card>
          <app-twitter-card class="StockSocial-tweets"></app-twitter-card>
        </div>
        <div [fxFlex]="'50%'">
          <div class="StockSocial-cardTitle">
            Negative Tweets
          </div>
          <app-twitter-card class="StockSocial-tweets"></app-twitter-card>
          <app-twitter-card class="StockSocial-tweets"></app-twitter-card>
        </div>
      </section>
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
