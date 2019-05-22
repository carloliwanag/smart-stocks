import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StockDetailComponent } from "@shared/ui/stock-detail";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartsModule } from "ng2-charts";
import { StockSearchComponent } from "./stock-search";
@NgModule({
  declarations: [StockSearchComponent, StockDetailComponent],
  imports: [
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [StockSearchComponent, StockDetailComponent]
})
export class UiModule {}
