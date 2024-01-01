import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainframeComponent } from './mainframe/mainframe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConversionService } from './mainframe/mainframe.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AppComponent, NavbarComponent, MainframeComponent],
  imports: [MatIconModule ,BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatButtonModule],
  providers: [CurrencyConversionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
