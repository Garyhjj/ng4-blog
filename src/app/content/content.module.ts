import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ContentComponent } from './content.component';
import { ArticleComponent } from './article/article.component';
import { PageComponent } from './page/page.component';
import { DetailComponent } from './detail/detail.component';
import { MydatePipe } from './shared/pipes/mydate.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    ContentComponent,
    ArticleComponent,
    PageComponent,
    DetailComponent,
    MydatePipe
  ],
  providers:    [  ]
})
export class ContentModule {}
