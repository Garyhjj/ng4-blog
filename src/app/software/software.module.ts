import { SoftwareComponent } from './software.component';
import { SoftwareRoutingModule } from './software-routing.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';



@NgModule({
  imports:      [ CommonModule, SoftwareRoutingModule ],
  declarations: [
    SoftwareComponent
  ],
  providers:    [  ]
})
export class SoftwareModule {}