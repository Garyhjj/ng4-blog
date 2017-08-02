import { Component, OnInit } from '@angular/core';
import { APPConfig } from './shared/config/app.config';

import { BlogService } from './core/services/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user = APPConfig.administrator;
  asideMes:any;
  container:any;
  constructor(private blogService: BlogService) {
    // this.asideMes = this.blogService.initAside();
    this.blogService.getArticlesConclude().then((res) => {
      this.asideMes = res.json();
    })

  }
  ngOnInit() {
    this.container = document.getElementsByTagName('body')[0];
    this.blogService.scrollDown.subscribe((val) => {
      this.scrollDown(val);
    })
  }
  scrollDown(data) {
    setTimeout(() => {
      this.container.scrollTop = data;
    }, 0);
  }
}
