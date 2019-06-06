import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { MatTabsModule } from "@angular/material/tabs";
import { UiModule } from "@shared/ui";
import {
  RouteComponents,
  StockDisplayRoutingModule
} from "./stock-display-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTabsModule,
    StockDisplayRoutingModule,
    UiModule
  ],
  declarations: [RouteComponents]
})
export class StockDisplayModule {}
