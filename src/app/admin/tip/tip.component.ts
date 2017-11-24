import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';

import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'my-tip',
  templateUrl: 'tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {

  comments:any;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {  }
  ngOnInit() {
    this.blogService.checkUnread.next(1);
    this.blogService.getNewComments().then((res) => {
      this.comments = res.json();
    })
  }

  toArticle(id:string) {
    // this.blogService.readNewCommentsByArticleId(id).then((res) => {this.blogService.checkUnread.next(1)}).
    // catch((e) => console.log(e));
    this.router.navigate(['/detail/'+id]).then(() => {
      this.blogService.readNewCommentsByArticleId(id);
    });
  }
}
