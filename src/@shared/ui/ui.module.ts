import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StockDetailComponent } from "@shared/ui/stock-detail";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartsModule } from "ng2-charts";
import { StockSearchComponent } from "./stock-search";
import { StockTrendGraphComponent } from "./stock-trend-graph";
import { StockVolumeGraphComponent } from "./stock-volume-graph";

@NgModule({
  declarations: [
    StockDetailComponent,
    StockSearchComponent,
    StockTrendGraphComponent,
    StockVolumeGraphComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule
  ],
  exports: [StockSearchComponent, StockDetailComponent]
})
export class UiModule {}
