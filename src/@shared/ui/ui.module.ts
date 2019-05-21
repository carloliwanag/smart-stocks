import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSearchComponent } from './stock-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StockSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    StockSearchComponent,
  ],
})
export class UiModule {}