import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'my-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  articles: any;
  setPage: any;
  article_opt = {
    showComment: true
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let type = params.type;
      let key = params.value;
      let page = +params.page;
      this.setPage = '';
      switch (type.toLowerCase()) {
        case 'type':
          this.getArticlesByType(key, page)
          break;
        case 'label':
          this.getArticlesByLabel(key, page)
          break;
        case 'date':
          this.getArticlesByDate(key, page)
          break;
        case 'key':
          this.getArticlesByKey(key, page)
          break;
        default:
          break;
      }
    })
  }
  getArticlesByType(key: string, page: Number) {
    this.blogService.getArticlesByType(key, page).then((res) => {
      let data = res.json();
      this.articles = data.articles;
      if(this.articles.length === 0) return
      this.setPageMes(data.total, data.onePage, page, 'type/' + key + '/')
    })
  }

  getArticlesByLabel(key: string, page: Number) {
    this.blogService.getArticlesByLabel(key, page).then((res) => {
      let data = res.json();
      this.articles = data.articles;
      if(this.articles.length === 0) return
      this.setPageMes(data.total, data.onePage, page, 'label/' + key + '/')
    })
  }

  getArticlesByDate(key: string, page: Number) {
    this.blogService.getArticlesByDate(key, page).then((res) => {
      let data = res.json();
      this.articles = data.articles;
      if(this.articles.length === 0) return
      this.setPageMes(data.total, data.onePage, page, 'date/' + key + '/')
    })
  }

  getArticlesByKey(key: string, page: Number) {
    this.blogService.getArticlesByKey(key, page).then((res) => {
      let data = res.json();
      this.articles = data.articles;
      if(this.articles.length === 0) return
      this.setPageMes(data.total, data.onePage, page, 'key/' + key + '/')
    })
  }

  setPageMes(total: Number, onePage:number, page: Number, route: string) {
    onePage = onePage || 2;
    if(Number(total)>0) {
      this.setPage = {
        pageSize: onePage,//每頁容量
        dataTotal: total,//總數據數量
        currPage: page,//目前頁碼
        currRoute: './search/' + route + '/',//目前除頁碼id的路由地址
        pageLength: 5//顯示的最多頁碼數
      };
      this.updateLocal();
    }
  }
  updateLocal() {
    this.blogService.currPageArticles = this.articles;
  }
  toDetail(item) {
    this.router.navigate(['./detail/' + item._id])
  }
}
