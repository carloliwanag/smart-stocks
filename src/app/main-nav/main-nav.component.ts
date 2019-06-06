import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { NavSearchService } from "@shared/services";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";

@Component({
  template: `
    <mat-toolbar color="primary" class="MainNav">
      <img src="assets/logo.png" class="logo" />
      <span>R2R Analytics</span>
      <span class="MainNav-spacer"></span>
      <app-nav-search (onBlur)="searchBlur($event)"></app-nav-search>
      <mat-icon>home</mat-icon>
      <mat-icon>fingerprint</mat-icon>
    </mat-toolbar>
  `,
  selector: "app-main-nav",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent implements OnInit {
  isHandset$: Rx.Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navSearchService: NavSearchService
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  searchBlur(keyword: string) {
    this.navSearchService.setSearchString(keyword);
  }
}
