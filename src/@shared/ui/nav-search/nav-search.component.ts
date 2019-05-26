import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";

@Component({
  template: `
    <form searchForm="ngForm" (ngSubmit)="blurEvent()">
      <mat-form-field class="mat-search_field" [@slideInOut]="searchVisible">
        <input #input matInput type="text" (blur)="blurEvent()" value="GOOG"/>
      </mat-form-field>
      <span
        class="mat-search_icons"
        [class.mat-search_icons--active]="searchVisible"
      >
        <mat-icon class="mat-search_icon-close" (click)="close()" matRipple
          >close</mat-icon
        >
        <mat-icon class="mat-search_icon-search" (click)="open()" matRipple
          >search</mat-icon
        >
      </span>
    </form>
  `,
  selector: "app-nav-search",
  styleUrls: ["./nav-search.component.scss"],
  animations: [
    trigger("slideInOut", [
      state("true", style({ width: "*" })),
      state("false", style({ width: "0" })),
      transition("true => false", animate("300ms ease-in")),
      transition("false => true", animate("300ms ease-out"))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSearchComponent {
  @Output() onBlur = new EventEmitter<string>();

  @ViewChild("input") inputElement: ElementRef;
  searchVisible = true;

  close() {
    this.searchVisible = false;
    this.inputElement.nativeElement.value = "";
  }

  open() {
    this.searchVisible = true;
    this.inputElement.nativeElement.focus();
  }

  blurEvent() {
    const inputValue = this.inputElement.nativeElement.value;

    if (!inputValue) {
      this.close();
    }

    this.onBlur.emit(inputValue);
  }
}
