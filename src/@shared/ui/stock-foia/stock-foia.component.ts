import { Component, Input } from "@angular/core";
import * as Rx from "rxjs";

@Component({
  selector: "app-stock-foia",
  styleUrls: ["./stock-foia.component.scss"],
  template: `
    <table
      *ngIf="stockData$ | async as tableData; else noData"
      mat-table
      [dataSource]="tableData"
      matSort
      class="Foia"
    >
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.requestername }}</td>
      </ng-container>

      <!-- Value Column -->
      <ng-container matColumnDef="companyname">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Company</th>
        <td mat-cell *matCellDef="let element">{{ element.companyname }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <ng-template #noData>
      <mat-list>
        <mat-list-item>No results found</mat-list-item>
      </mat-list>
    </ng-template>
  `
})
export class StockFoiaComponent {
  @Input() stockData$: Rx.Observable<any | undefined>;
  displayedColumns: string[] = ["name", "companyname"];
}
