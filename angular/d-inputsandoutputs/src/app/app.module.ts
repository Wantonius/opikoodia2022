import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Apple } from './apple.component';
import { Bucket } from './bucket.component';

@NgModule({
  declarations: [
    AppComponent,
	Apple,
	Bucket
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
