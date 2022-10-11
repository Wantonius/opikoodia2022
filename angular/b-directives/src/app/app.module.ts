import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Conditional } from './conditional.component';
import {PersonList} from './personlist.component';

@NgModule({
  declarations: [
    AppComponent,
	Conditional,
	PersonList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
