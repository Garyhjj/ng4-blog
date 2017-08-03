import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Subject }           from 'rxjs/Subject';

import { Http } from '@angular/http';
import { BlogConfig } from '../config/blog-config';

import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class BlogService {
  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) {  }

  reply = new Subject<string>();
  newComment = new Subject<any>();
  updateAside = new Subject<any>();
  scrollDown = new Subject<Number>();
  auth = new Subject<boolean>();
  asideMes:any;
  jwtHelper: JwtHelper = new JwtHelper();


  isTokenExpired() {
    let token = localStorage.getItem('id_token');
    if(!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }
  createArticle(data) {
    return this.authHttp.post(BlogConfig.createArticle,data).toPromise()
  }

  updateArticle(article) {
    return this.authHttp.post(BlogConfig.updateArticle,article).toPromise()
  }

  getArticles(num:string) {
    return this.http.get(BlogConfig.getArticles.replace('{num}',num)).toPromise()
  }

  getArticlesById(id:string) {
    return this.http.get(BlogConfig.getArticlesById.replace('{id}',id)).toPromise()
  }

  getOriginalArticleById(id:string) {
    return this.http.get(BlogConfig.getOriginalArticleById.replace('{id}',id)).toPromise()
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

  getCommnetsByAritcleId(id:string) {
    return this.http.get(BlogConfig.getCommnetsByAritcleId.replace('{str}',id)).toPromise();
  }

  createComment(comment:any) {
    return this.authHttp.post(BlogConfig.createComment, comment).toPromise();
  }

  checkUser(data:{accountName:string,password:string}) {
    return this.http.post(BlogConfig.checkUser, data).toPromise();
  }
}
