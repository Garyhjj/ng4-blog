import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditComponent } from './edit/edit.component';
import { TipComponent } from './tip/tip.component';


@NgModule({
  imports:      [ CommonModule, AdminRoutingModule, ReactiveFormsModule,SharedModule],
  declarations: [
    AdminComponent,
    EditComponent,
    TipComponent
  ],
  providers:    [  ]
})
export class AdminModule {}