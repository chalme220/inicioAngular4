import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataService} from './data.service';
import {AppRoutingModule} from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
