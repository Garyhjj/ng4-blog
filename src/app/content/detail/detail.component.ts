import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { BlogService } from '../../core/services/blog.service';

import { Subscription }           from 'rxjs/Subscription';

@Component({
  selector: 'my-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  @ViewChild('comment') commentArea:any;
  @ViewChild('wholeArea') wholeArea:any;
  containerArea:any;
  afterReq:boolean = false;// 控制页面loading的显示
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {  }

  article:any;
  article_opt ={
    showComment:false
  }
  mySubscribe:Subscription;
  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      let opt = params.name.split('*-*');
      let id = opt[0];
      setTimeout(() => {
        this.wholeArea.nativeElement.scrollIntoView();
      },20);
      let searchLocal = this.blogService.searchLocal(id);
      if(searchLocal && searchLocal.length>0) {
        this.article = searchLocal[0];
        this.afterReq = true;
        if(opt.length>1 && opt[1] === 'comment') {
          setTimeout(() => {
            this.commentArea.nativeElement.scrollIntoView();
          },20);
        }
      } else {
        this.blogService.loading.next(true);
        this.blogService.getArticlesById(id).then((res) => {
          if(res.status === 200) {
            this.afterReq = true;
            this.article = res.json().article;
            this.blogService.loading.next(false);
            if(opt.length>1 && opt[1] === 'comment') {
              setTimeout(() => {
                this.commentArea.nativeElement.scrollIntoView();
              },20);
            }
          }
        })
      }
    })
  }

  ngAfterViewInit() {

  }

  /**
   * 去到上一篇或下一篇文章
   * @param  {string} id 文章id
   */
  toOther(id:string) {
    this.router.navigate(['/detail/'+id]);
  }
}
