import { Injectable } from '@angular/core';
import { ContentConfig } from '../../content/shared/config/content.config';
import 'rxjs/add/operator/toPromise';

import { Http } from '@angular/http';
import { BlogConfig } from '../config/blog-config';

@Injectable()
export class BlogService {
  constructor(
    private http: Http
  ) {  }

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

  createArticle(data) {
    return this.http.post(BlogConfig.createArticle,data).toPromise()
  }

  getArticles(num:string) {
    return this.http.get(BlogConfig.getArticles.replace('{num}',num)).toPromise()
  }

  getArticlesById(id:string) {
    return this.http.get(BlogConfig.getArticlesById.replace('{id}',id)).toPromise()
  }

  getArticlesConclude() {
    return this.http.get(BlogConfig.getArticlesConclude).toPromise()
  }

  getArticlesByType(key:string,page:Number) {
    return this.http.get(BlogConfig.getArticlesByType.replace('{str}',key).replace('{num}',page+'')).toPromise();
  }

  getArticlesByLabel(key:string,page:Number) {
    return this.http.get(BlogConfig.getArticlesByLabel.replace('{str}',key).replace('{num}',page+'')).toPromise();
  }

  getArticlesByDate(key:string,page:Number) {
    return this.http.get(BlogConfig.getArticlesByDate.replace('{str}',key).replace('{num}',page+'')).toPromise();
  }

  getArticlesByKey(key:string,page:Number) {
    return this.http.get(BlogConfig.getArticlesByKey.replace('{str}',key).replace('{num}',page+'')).toPromise();
  }
}
