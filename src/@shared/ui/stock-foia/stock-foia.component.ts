import { Component, Input } from '@angular/core';
import * as Rx from "rxjs";

@Component({
    selector: 'app-stock-foia',
    styleUrls: ['./stock-foia.component.scss'],
    template: `
        <mat-list>
            <ng-container *ngIf="stockData$ | async as stockFOIA">
                <perfect-scrollbar class="StockNews-list">
                    <mat-list-item *ngFor="let foia of stockFOIA; last as last">
                        <p>{{ foia.requestername  }}</p>                                                
                        <mat-divider [inset]="true" *ngIf="!last"></mat-divider>
                    </mat-list-item>
                </perfect-scrollbar>
            </ng-container>
            <ng-container *ngIf="!(stockData$ | async)">
                <mat-list-item>No entries found</mat-list-item>
            </ng-container>
        </mat-list>
    `
})
export class StockFoiaComponent {
    @Input() stockData$: Rx.Observable<any | undefined>;

    
}