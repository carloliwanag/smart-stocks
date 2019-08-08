import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import { StockContactComponent } from "@shared/ui/stock-contact";
import { TagCloudModule } from "angular-tag-cloud-module";
import { ChartsModule } from "ng2-charts";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from "ngx-perfect-scrollbar";
import { environment } from "../../environments/environment";
import { EventsMapComponent } from "./events-map";
// custom components
import { NavSearchComponent } from "./nav-search";
import {
  StockChatterVolumeColumnComponent,
  StockChatterVolumeGraphComponent
} from "./stock-chatter-volume";
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
import { TwitterCardComponent } from "./twitter-card";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    EventsMapComponent,
    NavSearchComponent,
    StockChatterVolumeColumnComponent,
    StockChatterVolumeGraphComponent,
    StockContactComponent,
    StockFinanceDetailsComponent,
    StockFoiaComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockSentimentComponent,
    StockStatisticsComponent,
    StockSummaryGraphComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent,
    StockWordCloudComponent,
    TwitterCardComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    TagCloudModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  exports: [
    EventsMapComponent,
    NavSearchComponent,
    StockChatterVolumeGraphComponent,
    StockContactComponent,
    StockFinanceDetailsComponent,
    StockFoiaComponent,
    StockNewsComponent,
    StockQuoteComponent,
    StockSentimentComponent,
    StockStatisticsComponent,
    StockTrendGraphComponent,
    StockWordCloudComponent,
    TwitterCardComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UiModule {}
