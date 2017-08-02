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
  constructor(
    private route: ActivatedRoute,
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
      this.blogService.getArticlesById(id).then((res) => {
        if(res.status === 200) {
          this.article = res.json().article;
          if(opt.length>1 && opt[1] === 'comment') {
            setTimeout(() => {
              this.blogService.scrollDown.next(this.commentArea.nativeElement.offsetTop);
            },20);  
          }
        }
      })
    })
  }

  ngAfterViewInit() {

  }
}
