import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { StackedAreaChartComponent } from './stacked-area-chart/stacked-area-chart.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    StackedAreaChartComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NvD3Module 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
