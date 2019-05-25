import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StockDetailComponent } from "@shared/ui/stock-detail";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartsModule } from "ng2-charts";
import {MatListModule} from '@angular/material/list';

import { StockSearchComponent } from "./stock-search";
import { StockTrendGraphComponent } from "./stock-trend-graph";
import { StockVolumeGraphComponent } from "./stock-volume-graph";

import { StockNewsComponent } from "./stock-news";

@NgModule({
  declarations: [
    StockDetailComponent,
    StockSearchComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent,
    StockNewsComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatListModule
  ],
  exports: [StockSearchComponent, StockDetailComponent, StockNewsComponent]
})
export class UiModule {}
