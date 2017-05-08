import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AudioContextModule } from 'angular-audio-context';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { EffectDetailComponent }  from './effect-detail.component';
import { EffectsComponent }      from './effects.component';
import { EffectService }          from './effect.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AudioContextModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EffectDetailComponent,
    EffectsComponent,
    AudioContextModule
  ],
  providers: [ EffectService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
