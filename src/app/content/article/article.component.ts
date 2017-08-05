import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Router }            from '@angular/router';

import { BlogService } from '../../core/services/blog.service';
import { Subscription }           from 'rxjs/Subscription';

@Component({
  selector: 'my-article',
  templateUrl: 'article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  @Input() article:any;
  @Input() opt:any;
  auth:boolean = false;
  mySubscribe : Subscription;

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.auth = !this.blogService.isTokenExpired();
    this.mySubscribe = this.blogService.auth.subscribe((val) => {
      this.auth = val;
    })
  }

  ngOnDestroy() {
    this.mySubscribe.unsubscribe();
  }
  // 1 可跳到评论页
  toDetial(type:number) {
    if(type === 1) {
      this.router.navigate(['/detail/'+this.article._id+'\*\-\*comment']);
    } else {
      this.router.navigate(['/detail/'+this.article._id]);
    }
  }

  reEdit() {
    this.router.navigate(['/edit/'+this.article._id]);
  }

  toType(type:string) {
    this.router.navigate(['/search/type/' + type +'/1']);
  }

  toLabel(label:string) {
    this.router.navigate(['/search/label/' + label +'/1']);
  }
}
