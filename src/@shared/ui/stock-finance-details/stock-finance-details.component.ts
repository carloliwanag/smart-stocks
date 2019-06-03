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
      class="FinanceDetails"
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

    <mat-list *ngIf="!dataSource">
      <mat-list-item>No results found</mat-list-item>
    </mat-list>
  `,
  selector: "app-stock-finance-details",
  styleUrls: ["./stock-finance-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockFinanceDetailsComponent implements OnChanges {
  @Input() data: any;
  displayedColumns: string[] = ["name", "value"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.prepareData();
    }
  }

  prepareData() {
    const data = this.data.finance;
    const tableData = [
      { name: "Current Price", value: data.currentPrice_fmt },
      { name: "Debt to Equity", value: data.debtToEquity_fmt },
      { name: "Ebitda Margins", value: data.ebitdaMargins_fmt },
      { name: "Ebitda", value: data.ebitda_longFmt },
      { name: "Free Cash Flow", value: data.freeCashflow_longFmt },
      { name: "Gross Margins", value: data.grossMargins_fmt },
      { name: "Gross Profits", value: data.grossProfits_longFmt },
      { name: "Operating Cash Flow", value: data.operatingCashflow_longFmt },
      { name: "Operating Margins", value: data.operatingMargins_fmt },
      { name: "Profit Margins", value: data.profitMargins_fmt },
      { name: "Quick Ratio", value: data.quickRatio_fmt },
      { name: "Return on Assets", value: data.returnOnAssets_fmt },
      { name: "Return on Equity", value: data.returnOnEquity_fmt },
      { name: "Revenue Growth", value: data.revenueGrowth_fmt },
      { name: "Revenue Per Share", value: data.revenuePerShare_fmt },
      { name: "Target High Price", value: data.targetHighPrice_fmt },
      { name: "Target Low Price", value: data.targetLowPrice_fmt },
      { name: "Total Cash Per Share", value: data.totalCashPerShare_fmt },
      { name: "Total Cash", value: data.totalCash_longFmt },
      { name: "Total Debt", value: data.totalDebt_longFmt },
      { name: "Total Revenue", value: data.totalRevenue_longFmt }
    ];

    this.dataSource = new MatTableDataSource(tableData);
    this.cd.detectChanges();
  }
}
