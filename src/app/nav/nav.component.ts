import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services/blog.service';

import { Store } from '@ngrx/store';
import { Logout } from '../core/actions/auth';

@Component({
  selector: 'my-nav',
  templateUrl: 'nav.component.html',
})
export class NavComponent implements OnInit {
  isLogout:boolean;
  num:number;
  interval:any;
  constructor(
    private blogService: BlogService,
    private store$: Store<any>
  ) {  }

  ngOnInit() {
    this.store$.select('authReducer').subscribe((store)=>{
      this.isLogout = !store.auth;
      if(!this.isLogout) {
        this.getNewCommentsCount();
        this.setIntervalForCount();
      }else {
        clearInterval(this.interval);
      }
    })
  }
  setIntervalForCount() {
    this.interval = setInterval(() => {
      this.getNewCommentsCount();
    },7000)
  }

  async getNewCommentsCount() {
    if(this.isLogout) return;
    let res:any = await this.blogService.getNewCommentsCount().catch((e) => {
      if(e.status === 401) {
        this.store$.select('authReducer').dispatch(new Logout());
      }
      console.log(e);
    });
    this.num = Number(res.json().count);
  }
}
