import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSearchComponent } from './stock-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import {StockDetailComponent} from '@shared/ui/stock-detail';

@NgModule({
  declarations: [
    StockSearchComponent,
    StockDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [
    StockSearchComponent,
    StockDetailComponent
  ],
})
export class UiModule {}