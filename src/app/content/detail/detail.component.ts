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
        this.blogService.scrollDown.next(0);
      },20);
      let searchLocal = this.blogService.searchLocal(id);
      if(searchLocal && searchLocal.length>0) {
        this.article = searchLocal[0];
        this.afterReq = true;
        this.blogService.scrollDown.next(this.commentArea.nativeElement.offsetTop);
      } else {
        this.blogService.getArticlesById(id).then((res) => {
          if(res.status === 200) {
            this.afterReq = true;
            this.article = res.json().article;
            if(opt.length>1 && opt[1] === 'comment') {
              setTimeout(() => {
                this.blogService.scrollDown.next(this.commentArea.nativeElement.offsetTop);
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
