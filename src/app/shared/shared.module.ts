import { PageComponent } from './component/page/page.component';
import { ArticleComponent } from './component/article/article.component';
import { PipesModule } from './pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, PipesModule],
    declarations: [ArticleComponent, PageComponent],
    exports: [CommonModule,PipesModule, ArticleComponent, PageComponent],
    entryComponents: [],
    providers: []
})
export class SharedModule { }
