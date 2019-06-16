import { Component, Input } from "@angular/core";
import { FOIAList } from "@shared/services";

@Component({
  template: `
    <table
      *ngIf="foia && foia.length > 0; else noData"
      mat-table
      [dataSource]="foia"
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
        <td mat-cell *matCellDef="let element">
          {{ element.requestdescription }}
        </td>
      </ng-container>

      <!-- Value Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Description</th>
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
  `,
  selector: "app-stock-foia",
  styleUrls: ["./stock-foia.component.scss"]
})
export class StockFoiaComponent {
  @Input() foia: FOIAList | undefined;
  displayedColumns: string[] = ["name", "companyname", "description"];
}
