import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ContentComponent } from './content.component';

@NgModule({
  imports:      [ CommonModule, ContentRoutingModule, SharedModule ],
  declarations: [
    ContentComponent
  ],
  providers:    [  ]
})
export class ContentModule {}
