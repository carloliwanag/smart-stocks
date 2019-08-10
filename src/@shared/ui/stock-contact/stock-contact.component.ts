import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { Contact } from "@shared/services";

@Component({
  template: `
    <table
      *ngIf="dataSource"
      mat-table
      [dataSource]="dataSource"
      matSort
      class="Contact"
    >
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Name
        </th>
        <td mat-cell [ngClass]="'Contact-nameColumn'" *matCellDef="let element">
          {{ element.name }}
        </td>
      </ng-container>

      <!-- Value Column -->
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Value</th>
        <td mat-cell *matCellDef="let element">
          <a
            *ngIf="
              (element.name === 'Website' || element.name === 'Link') &&
                element.value;
              else text
            "
            mat-button
            class="Contact-link"
            href="{{ element.value }}"
            target="_blank"
          >
            {{ element.value }}
          </a>
          <ng-template #text>
            <span>{{ element.value }}</span>
          </ng-template>
        </td>
      </ng-container>

      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <mat-list *ngIf="!dataSource">
      <mat-list-item>No results found</mat-list-item>
    </mat-list>
  `,
  selector: "app-stock-contact",
  styleUrls: ["./stock-contact.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockContactComponent implements OnChanges {
  @Input() contact: Contact | undefined;
  displayedColumns: string[] = ["name", "value"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = undefined;

    if (changes.contact && changes.contact.currentValue) {
      this.prepareData();
    }

    this.cd.detectChanges();
  }

  private prepareData() {
    const data = this.contact;
    const tableData = [
      { name: "Name", value: data.Name },
      { name: "Website", value: data.Website },
      { name: "Telephone", value: data.Telephone },
      { name: "Email 1", value: data["Email 1"] },
      { name: "Email 2", value: data["Email 2"] },
      { name: "Address", value: data.Address },
      { name: "Exec Name", value: data["Exec Name"] },
      { name: "Exec Title", value: data.ExecTitle },
      { name: "Market Cap", value: data["Mkt Cap"] },
      { name: "Industry", value: data.Industry },
      { name: "Sector", value: data.Sector },
      { name: "Description", value: data.Description },
      { name: "Exec Salutation", value: data["Exec Salutation"] },
      { name: "Exec First Name", value: data["Exec First Name"] },
      { name: "Exec Middle Name", value: data["Exec Middle Name"] },
      { name: "Exec Last Name", value: data["Exec Last Name"] },
      { name: "Exec Pay", value: data["Exec Pay"] },
      { name: "Exchange", value: data.Exchange },
      { name: "Symbol", value: data.Symbol },
      { name: "Source", value: data.source },
      { name: "Link", value: data.Link },
      { name: "Cap Type", value: data.cap_type }
    ];

    this.dataSource = new MatTableDataSource(tableData);
  }
}
