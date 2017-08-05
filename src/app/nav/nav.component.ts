import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'my-nav',
  templateUrl: 'nav.component.html',
})
export class NavComponent implements OnInit {
  isLogout:boolean;
  num:number;
  constructor(private blogService: BlogService) {  }

  ngOnInit() {
    this.isLogout = this.blogService.isTokenExpired();
    this.blogService.auth.subscribe((val) => {
      this.isLogout = !val;
      this.getNewCommentsCount();
    })
    this.getNewCommentsCount();

    this.blogService.checkUnread.subscribe((val) => {
      this.getNewCommentsCount();
    });

    setInterval(() => {
      this.getNewCommentsCount();
    },7000)
  }

  async getNewCommentsCount() {
    if(this.isLogout) return;
    let res:any = await this.blogService.getNewCommentsCount().catch((e) => {console.log(e)});
    this.num = Number(res.json().count);
  }
}
