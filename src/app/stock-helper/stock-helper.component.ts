import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  template: `
    <section class="StockHelper">
      <mat-card>
        <ng-container *ngIf="!busy">
          <mat-card-header>
            <mat-card-title>Quotes</mat-card-title>
          </mat-card-header>
          <app-stock-quote [data]="data"></app-stock-quote>
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
  styleUrls: ["./stock-helper.component.scss"]
})
export class StockHelperComponent implements OnInit, OnDestroy {
  @Input() stockData$: Rx.Observable<any | undefined>;
  @Input() busy: boolean;

  data: any;
  private stockDataSubscription: Rx.Subscription;

  ngOnInit(): void {
    this.stockDataSubscription = this.stockData$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    if (this.stockDataSubscription) {
      this.stockDataSubscription.unsubscribe();
    }
  }
}
