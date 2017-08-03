import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
