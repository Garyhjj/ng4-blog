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
  checkUnread = new Subject<any>();
  asideMes:any;
  jwtHelper: JwtHelper = new JwtHelper();
  currPageArticles:any[];// 作为当前页的所有文章的缓存容器

  /**
   * 根据文章id搜索本地缓存的文章
   * @param  {string} id 文章id
   * @return {文章|null}    结果
   */
  searchLocal(id:string) {
    if(this.currPageArticles && this.currPageArticles.length > 0) {
      return this.currPageArticles.filter((art) => {
        return art._id == id
      });
    } else {
      return null;
    }
  }

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

  deleteArticle(id:string) {
    return this.authHttp.delete(BlogConfig.deleteArticle.replace('{str}',id)).toPromise()
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

  /**
   * 获得blog的统计信息，在侧边栏aside中使用
   * @return {Promise<response>} http的结果
   */
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

  getNewCommentsCount() {
    return this.authHttp.get(BlogConfig.getNewCommentsCount).toPromise();
  }

  getNewComments() {
    return this.authHttp.get(BlogConfig.getNewComments).toPromise();
  }

  readNewCommentsByArticleId(id:string) {
    return this.authHttp.get(BlogConfig.readNewCommentsByArticleId.replace('{str}',id)).toPromise();
  }

  checkUser(data:{accountName:string,password:string}) {
    return this.http.post(BlogConfig.checkUser, data).toPromise();
  }
}
