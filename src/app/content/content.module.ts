import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentComponent } from './content.component';
import { ArticleComponent } from './article/article.component';
import { PageComponent } from './page/page.component';
import { DetailComponent } from './detail/detail.component';
import { CommentComponent } from './comment/comment.component';
import { EditComponent } from './edit/edit.component';
import { MydatePipe } from './shared/pipes/mydate.pipe';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [
    ContentComponent,
    ArticleComponent,
    PageComponent,
    DetailComponent,
    CommentComponent,
    EditComponent,
    MydatePipe
  ],
  providers:    [  ]
})
export class ContentModule {}
