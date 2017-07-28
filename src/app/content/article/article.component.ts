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

  toDetial() {
    this.router.navigate(['./detail/'+this.article.title+'\*\-\*comment'])
  }
}
