import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import { StockDetailComponent } from "@shared/ui/stock-detail";
import { ChartsModule } from "ng2-charts";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from "ngx-perfect-scrollbar";
import { NavSearchComponent } from "./nav-search";
import { StockFinanceDetailsComponent } from "./stock-finance-details";
import { StockFoiaComponent } from "./stock-foia";
import { StockNewsComponent } from "./stock-news";
import { StockQuoteComponent } from "./stock-quote";
import { StockSentimentComponent } from "./stock-sentiment";
import { StockStatisticsComponent } from "./stock-statistics";
import { StockSummaryGraphComponent } from "./stock-summary-graph";
import { StockTrendGraphComponent } from "./stock-trend-graph";
import { StockVolumeGraphComponent } from "./stock-volume-graph";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    NavSearchComponent,
    StockDetailComponent,
    StockFinanceDetailsComponent,
    StockFoiaComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockSentimentComponent,
    StockStatisticsComponent,
    StockSummaryGraphComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  exports: [
    NavSearchComponent,
    StockDetailComponent,
    StockFinanceDetailsComponent,
    StockTrendGraphComponent,
    StockQuoteComponent,
    StockStatisticsComponent,
    StockSentimentComponent,
    StockNewsComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UiModule {}
