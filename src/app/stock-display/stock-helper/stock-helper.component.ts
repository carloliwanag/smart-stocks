import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <section class="StockHelper">
      <mat-card>
        <ng-container *ngIf="!busy">
          <mat-card-header>
            <mat-card-title>Quotes</mat-card-title>
          </mat-card-header>
          <app-stock-quote [data]="stock"></app-stock-quote>
        </ng-container>
        <mat-spinner
          class="StockHelper-spinner"
          *ngIf="busy"
          [color]="'accent'"
          [diameter]="50"
        ></mat-spinner>
      </mat-card>
    </section>
  `,
  selector: "app-stock-helper",
  styleUrls: ["./stock-helper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockHelperComponent {
  @Input() stock: any;
  @Input() busy: boolean;
}
