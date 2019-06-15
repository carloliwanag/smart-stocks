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
import { TagCloudModule } from "angular-tag-cloud-module";
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
import { StockWordCloudComponent } from "./stock-word-cloud";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    NavSearchComponent,
    StockFinanceDetailsComponent,
    StockFoiaComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockSentimentComponent,
    StockStatisticsComponent,
    StockSummaryGraphComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent,
    StockWordCloudComponent
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
    ReactiveFormsModule,
    TagCloudModule
  ],
  exports: [
    NavSearchComponent,
    StockFinanceDetailsComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockSentimentComponent,
    StockStatisticsComponent,
    StockTrendGraphComponent,
    StockWordCloudComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UiModule {}
