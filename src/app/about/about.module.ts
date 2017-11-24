import { AboutRoutingModule } from './about-routing.modult';
import { AboutComponent } from './about.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';



@NgModule({
  imports:      [ CommonModule, AboutRoutingModule ],
  declarations: [
    AboutComponent
  ],
  providers:    [  ]
})
export class AboutModule {}