import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockDisplayComponent } from "./stock-display.component";
import { StockHelperComponent } from "./stock-helper/stock-helper.component";

export const RouteComponents = [StockDisplayComponent, StockHelperComponent];

const routes: Routes = [
  {
    path: "",
    component: StockDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockDisplayRoutingModule {}
