import { Component } from "@angular/core";
import { StockSearch } from "@shared/services";

export const DEFAULT_STOCK: StockSearch = {
  ticker: "TSLA",
  company_name: "Tesla, Inc."
};

@Component({
  template: `
    <mat-sidenav-container>
      <mat-sidenav-content>
        <app-main-nav></app-main-nav>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  selector: "app-root",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
