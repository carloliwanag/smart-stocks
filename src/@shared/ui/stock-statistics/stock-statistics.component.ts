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

@Component({
  template: `
    <table
      *ngIf="dataSource"
      mat-table
      [dataSource]="dataSource"
      matSort
      class="Statistics"
    >
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <!-- Value Column -->
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Value</th>
        <td mat-cell *matCellDef="let element">{{ element.value }}</td>
      </ng-container>

      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <div *ngIf="!dataSource">No results found</div>
  `,
  selector: "app-stock-statistics",
  styleUrls: ["./stock-statistics.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockStatisticsComponent implements OnChanges {
  @Input() data: any;
  displayedColumns: string[] = ["name", "value"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.prepareData();
    }
  }

  prepareData() {
    const data = this.data.statistics;
    const tableData = [
      {
        name: "52 Week Change",
        value: data.defaultKeyStatistics_52WeekChange_fmt
      },
      { name: "Book Value", value: data.defaultKeyStatistics_bookValue_fmt },
      {
        name: "Enterprise to Ebitda",
        value: data.defaultKeyStatistics_enterpriseToEbitda_fmt
      },
      {
        name: "Enterprise to Revenue",
        value: data.defaultKeyStatistics_enterpriseToRevenue_fmt
      },
      {
        name: "Enterprise Value",
        value: data.defaultKeyStatistics_enterpriseValue_longFmt
      },
      {
        name: "Float Shares",
        value: data.defaultKeyStatistics_floatShares_longFmt
      },
      { name: "Forward PE", value: data.defaultKeyStatistics_forwardPE_fmt },
      {
        name: "Last Fiscal Year End",
        value: data.defaultKeyStatistics_lastFiscalYearEnd_fmt
      },
      {
        name: "Most Recent Quarter",
        value: data.defaultKeyStatistics_mostRecentQuarter_fmt
      },
      { name: "Peg Ratio", value: data.defaultKeyStatistics_pegRatio_fmt },
      {
        name: "Profit Margins",
        value: data.defaultKeyStatistics_profitMargins_fmt
      },
      {
        name: "Outstanding Shares",
        value: data.defaultKeyStatistics_sharesOutstanding_longFmt
      }
    ];

    this.dataSource = new MatTableDataSource(tableData);
    this.cd.detectChanges();
  }
}
