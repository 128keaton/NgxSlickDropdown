import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SlickDropdownModule} from '../../projects/slick-dropdown/src/lib/slick-dropdown.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
