import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { ContentConfig } from './shared/config/content.config';

import { BlogService } from '../core/services/blog.service';

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
      console.log(params)
      this.blogService.getArticles(params.id).then((res) => {
        console.log(res.json());
        let result = res.json()
        this.articles = result.articles;
        this.setPage = {
          pageSize:2,//每頁容量
          dataTotal:result.total,//總數據數量
          currPage:params.id,//目前頁碼
          currRoute:'./main',//目前除頁碼id的路由地址
          pageLength:5//顯示的最多頁碼數
        }
      })
    })

  }
  toDetail(item) {
      this.router.navigate(['./detail/'+item._id])
  }
}
