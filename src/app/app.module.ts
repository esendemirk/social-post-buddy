import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';
import { HashtagsComponent } from './hashtags/hashtags.component';
import { CaptionsComponent } from './captions/captions.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student.service';

import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: CaptionsComponent
}, {
  path: 'addCaption',  //when captions added 
  component: CaptionsComponent
}, {
  path: 'editCaption/:_id', //when captions edited 
  component: CaptionsComponent 
}, {
  path: 'addHashtag',  //when hashtags added 
  component: HashtagsComponent
}, {
  path: 'editHashtag/:_id', //when hashtags edited 
  component: HashtagsComponent 
}, {
  path: 'addLocation',  //when locations added 
  component: LocationsComponent
}, {
  path: 'editLocation/:_id', //when locations edited 
  component: LocationsComponent
}, {
  path: '**',  //when path cannot be found
  component: NotFoundComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    HashtagsComponent,
    CaptionsComponent,
    NotFoundComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
