import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule
} from "@angular/material";
import { StockDetailComponent } from "@shared/ui/stock-detail";
import { ChartsModule } from "ng2-charts";
import { NavSearchComponent } from "./nav-search";
import { StockFinanceDetailsComponent } from "./stock-finance-details";
import { StockNewsComponent } from "./stock-news";
import { StockQuoteComponent } from "./stock-quote";
import { StockStatisticsComponent } from "./stock-statistics";
import { StockSummaryGraphComponent } from "./stock-summary-graph";
import { StockTrendGraphComponent } from "./stock-trend-graph";
import { StockVolumeGraphComponent } from "./stock-volume-graph";

@NgModule({
  declarations: [
    NavSearchComponent,
    StockDetailComponent,
    StockFinanceDetailsComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockStatisticsComponent,
    StockSummaryGraphComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  exports: [
    NavSearchComponent,
    StockDetailComponent,
    StockFinanceDetailsComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockStatisticsComponent,
    StockSummaryGraphComponent
  ]
})
export class UiModule {}
