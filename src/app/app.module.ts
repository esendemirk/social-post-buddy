import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { HashtagsComponent } from './hashtags/hashtags.component';
import { CaptionsComponent } from './captions/captions.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    HashtagsComponent,
    CaptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
