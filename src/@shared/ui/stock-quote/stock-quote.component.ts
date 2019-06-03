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

    <mat-list *ngIf="!dataSource">
      <mat-list-item>No results found</mat-list-item>
    </mat-list>
  `,
  selector: "app-stock-quote",
  styleUrls: ["./stock-quote.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockQuoteComponent implements OnChanges {
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
    const data = this.data.quote;
    const tableData = [
      {
        name: "52 Week High Change Percent",
        value: data.quoteData_fiftyTwoWeekHighChangePercent_fmt
      },
      {
        name: "52 Week High Change",
        value: data.quoteData_fiftyTwoWeekHighChange_raw
      },
      {
        name: "52 Week Low Change Percent",
        value: data.quoteData_fiftyTwoWeekLowChangePercent_fmt
      },
      {
        name: "52 Week Low Change",
        value: data.quoteData_fiftyTwoWeekLowChange_fmt
      },
      {
        name: "52 Week Low",
        value: data.quoteData_fiftyTwoWeekLow_fmt
      },
      {
        name: "52 Week Range",
        value: data.quoteData_fiftyTwoWeekRange_fmt
      },
      { name: "Market Cap", value: data.quoteData_marketCap_longFmt },
      {
        name: "Regular Market Change Percent",
        value: data.quoteData_regularMarketChangePercent_fmt
      },
      {
        name: "Regular Market Day High",
        value: data.quoteData_regularMarketDayHigh_fmt
      },
      {
        name: "Regular Market Day Low",
        value: data.quoteData_regularMarketDayLow_fmt
      },
      {
        name: "Regular Market Day Range",
        value: data.quoteData_regularMarketDayRange_fmt
      },
      {
        name: "Regular Market Open",
        value: data.quoteData_regularMarketOpen_fmt
      },
      {
        name: "Regular Market Previous Close",
        value: data.quoteData_regularMarketPreviousClose_fmt
      },
      {
        name: "Regular Market Price",
        value: data.quoteData_regularMarketPrice_fmt
      },
      {
        name: "Regular Market Time",
        value: data.quoteData_regularMarketTime_fmt
      },
      {
        name: "Regular Market Volume",
        value: data.quoteData_regularMarketVolume_fmt
      },
      {
        name: "Outstanding Shares",
        value: data.quoteData_sharesOutstanding_longFmt
      }
    ];

    this.dataSource = new MatTableDataSource(tableData);
    this.cd.detectChanges();
  }
}
