import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockDisplayComponent } from "./stock-display.component";
import { StockEventCardComponent } from "./stock-event-card/stock-event-card.component";
import { StockHelperComponent } from "./stock-helper/stock-helper.component";
import { StockInfoComponent } from "./stock-info/stock-info.component";
import { StockSentimentComponent } from "./stock-sentiment/stock-sentiment.component";
import { StockSocialComponent } from "./stock-social/stock-social.component";
import { StockTrendingComponent } from "./stock-trending/stock-trending.component";

export const RouteComponents = [
  StockDisplayComponent,
  StockEventCardComponent,
  StockHelperComponent,
  StockInfoComponent,
  StockSentimentComponent,
  StockSocialComponent,
  StockTrendingComponent
];

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
