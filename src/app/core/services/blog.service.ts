import { Injectable } from '@angular/core';
import { ContentConfig } from '../../content/shared/config/content.config';

@Injectable()
export class BlogService {
  constructor() {  }

  asideMes:any;
  allArticles =ContentConfig.articles;

  initAside() {
    let articles1 = ContentConfig.articles.slice(0,2);
    this.asideMes={
      type:[{name:'HTML',num:'10'},{name:'CSS3',num:'15'}],
      label: ['语法','源码'],
      date:['1498838400000','1496246400000']
    }
    this.asideMes.page1 = articles1;
    return this.asideMes
  }
  getArticle(page:number) {
    return ContentConfig.articles.slice((page-1)*2,page*2);
  }
  getArticleByTitle(title:string) {
    let target = this.allArticles.filter((item:any) => {
      return item.title == title;
    })
    return target;
  }
}
