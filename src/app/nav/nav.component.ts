import { Component, OnInit } from '@angular/core';
import { BlogService } from '../core/services/blog.service';
import { Observable }        from 'rxjs';
import { Store } from '@ngrx/store';

import { Logout } from '../core/actions/auth';

@Component({
  selector: 'my-nav',
  templateUrl: 'nav.component.html',
})
export class NavComponent implements OnInit {
  isLogout:boolean;
  num:Observable<number>;
  interval:any;
  constructor(
    private blogService: BlogService,
    private store$: Store<any>
  ) {  }

  ngOnInit() {
    this.store$.select('authReducer').subscribe((store)=>{
      this.isLogout = !store.auth;
      if(!this.isLogout) {
        this.blogService.getNewCommentsCount();
        this.setIntervalForCount();
      }else {
        clearInterval(this.interval);
      }
    })
    this.num = this.store$.select('tipReducer').map(store => store.tip);
  }
  setIntervalForCount() {
    this.interval = setInterval(() => {
      this.blogService.getNewCommentsCount();
    },7000)
  }
}
