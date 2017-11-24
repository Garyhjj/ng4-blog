import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { CommentComponent } from './comment/comment.component';
import { DetailRoutingModule } from './detail-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailComponent } from './detail.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
    imports: [ CommonModule, DetailRoutingModule, SharedModule, ReactiveFormsModule],
    declarations: [
        DetailComponent,
        CommentComponent,
        MessageComponent
    ]
})
export class DetailModule {}