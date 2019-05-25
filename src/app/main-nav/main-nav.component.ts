import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import * as Rx from "rxjs";
import { map } from "rxjs/operators";

@Component({
  template: `
    <mat-toolbar color="primary" class="MainNav">
      <span>Chris Stocks App</span>
      <mat-icon>scatter_plot</mat-icon>
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
  @Output() onSearchBlur = new EventEmitter<string>();

  isHandset$: Rx.Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  searchBlur(keyword: string) {
    this.onSearchBlur.emit(keyword);
  }
}
