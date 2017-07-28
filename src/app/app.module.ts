import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './route/app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { ContentModule } from './content/content.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    ContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
