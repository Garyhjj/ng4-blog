import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { BlogService } from '../core/services/blog.service';
import { ContentConfig } from './shared/config/content.config';

@Component({
  selector: 'my-content',
  templateUrl: 'content.component.html',
  styleUrls : ['./content.component.css']
})
export class ContentComponent implements OnInit {
  articles:any;
  setPage:any;
  article_opt = {
    showComment:true
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.route.params.subscribe((params) =>{
      this.setPage = '';
      this.blogService.getArticles(params.id).then((res) => {
        let result = res.json()
        this.articles = result.articles;
        this.blogService.currPageArticles = this.articles;
        if(result.total === 0 || this.articles.length === 0) return;
        this.setPage = {
          pageSize:result.onePage,//每頁容量
          dataTotal:result.total,//總數據數量
          currPage:params.id,//目前頁碼
          currRoute:'./main',//目前除頁碼id的路由地址
          pageLength: ContentConfig.pageLength//顯示的最多頁碼數
        }
        this.blogService.scrollDown.next(0);
      })
    })

  }
  toDetail(item) {
      this.router.navigate(['./detail/'+item._id])
  }
}
