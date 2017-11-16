import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from './core/reducers/auth';
import { tipReducer } from './core/reducers/tip'
import { AuthEffects } from './core/effects/auth';
import { AppRoutingModule } from './route/app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { SoftwareComponent } from './software/software.component';
import { ContentModule } from './content/content.module';
import { AuthGuard }              from './route/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    LoginComponent,
    AboutComponent,
    SoftwareComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    ContentModule,
    FormsModule,
    StoreModule.forRoot({authReducer:authReducer, tipReducer:tipReducer}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
