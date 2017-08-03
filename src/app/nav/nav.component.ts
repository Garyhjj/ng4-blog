import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'my-nav',
  templateUrl: 'nav.component.html',
})
export class NavComponent implements OnInit {
  isLogout:boolean;
  constructor(private blogService: BlogService) {  }

  ngOnInit() {
    this.isLogout = this.blogService.isTokenExpired();
    this.blogService.auth.subscribe((val) => {
      this.isLogout = !val;
    })
  }
}
