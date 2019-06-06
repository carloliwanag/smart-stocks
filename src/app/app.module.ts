import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiModule } from "@shared/ui";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainNavComponent } from "./main-nav/main-nav.component";

@NgModule({
  declarations: [AppComponent, MainNavComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    UiModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
