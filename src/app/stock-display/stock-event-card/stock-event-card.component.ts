import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <mat-card class="StockEventCard">
      <ng-container *ngIf="!busy">
        <mat-card-header>
          <mat-card-title>
            Events
          </mat-card-title>
        </mat-card-header>
        <mat-card-content class="">
          <app-events-map
            *ngIf="events"
            class="StockEventCard-components"
            [events]="events"
          >
          </app-events-map>
          <div *ngIf="!events || events.length <= 0">
            No results found
          </div>
        </mat-card-content>
      </ng-container>
      <mat-spinner
        class="StockEventCard-spinner"
        *ngIf="busy"
        [color]="'accent'"
        [diameter]="50"
      ></mat-spinner>
    </mat-card>
  `,
  selector: "app-stock-event-card",
  styleUrls: ["./stock-event-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockEventCardComponent {
  @Input() busy: boolean;
  @Input() events: any;
}
