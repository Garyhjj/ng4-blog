import { Component, OnInit, Input } from '@angular/core';

import { Router }            from '@angular/router';

@Component({
  selector: 'my-article',
  templateUrl: 'article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article:any;
  @Input() opt:any;
  constructor(
    private router: Router,
  ) {  }

  ngOnInit() {}

  // 1 可跳到评论页
  toDetial(type:number) {
    if(type === 1) {
      this.router.navigate(['./detail/'+this.article._id+'\*\-\*comment'])
    } else {
      this.router.navigate(['./detail/'+this.article._id])
    }
  }
}
