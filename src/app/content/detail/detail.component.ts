import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'my-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {  }

  article:any;
  article_opt ={
    showComment:false
  }
  ngOnInit() {
    this.route.params.subscribe((params:Params) =>{
      let title = params.name.split('*-*')[0];
      this.article = this.blogService.getArticleByTitle(title);
    })
  }
}
