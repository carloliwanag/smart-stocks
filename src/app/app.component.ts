import { Component } from "@angular/core";
import { StockSearch } from "@shared/services";

export const DEFAULT_STOCK: StockSearch = {
  ticker: "TSLA",
  company_name: "Tesla, Inc."
};

@Component({
  template: `
    <mat-sidenav-container class="Main">
      <mat-sidenav-content>
        <app-main-nav class="Main-nav"></app-main-nav>
        <section class="Main-content">
          <router-outlet></router-outlet>
        </section>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  selector: "app-root",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
