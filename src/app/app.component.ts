import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Init } from './core/actions/auth';
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
  loading:boolean = false;
  constructor(
    private blogService: BlogService,
    private store$: Store<any>
  ) {
    // this.asideMes = this.blogService.initAside();
    this.blogService.getArticlesConclude().then((res) => {
      this.asideMes = res.json();
    })

  }
  ngOnInit() {
    this.store$.select('authReducer').dispatch(new Init())
    this.container = document.getElementsByTagName('body')[0];
    this.blogService.loading.subscribe((b) => setTimeout(() => {
      this.loading= b;
      b && setTimeout(() => {
        let back:any = document.getElementsByClassName('backdrop');
        (back.length>0) && (back[0].style.height = Math.max(document.body.clientHeight,window.screen.height)+'px');
      },0)
      
    },20));
  }
}
