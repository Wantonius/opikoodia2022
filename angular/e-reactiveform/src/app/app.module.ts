import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {ReactiveForm} from './reactiveform.component';

@NgModule({
  declarations: [
    AppComponent,
	ReactiveForm
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
