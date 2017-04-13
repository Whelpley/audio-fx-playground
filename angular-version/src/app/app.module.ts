import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

// import { AudioContextModule } from 'angular-audio-context';

import { AppComponent }  from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
    // AudioContextModule 
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


