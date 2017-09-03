import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription }           from 'rxjs/Subscription';

import { BlogService } from '../core/services/blog.service';
import { Logout } from '../core/actions/auth';

@Component({
  selector: 'my-aside',
  templateUrl: 'aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  @Input() opt:any;
  mySubscribe: Subscription;
  showLogin:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private store$: Store<any>
  ) {  }

  ngOnInit() {
    this.mySubscribe = this.blogService.updateAside.subscribe((val) => {
      this.blogService.getArticlesConclude().then((res) => {
        this.opt = res.json();
      })
    })
  }

  ngOnDestroy() {
    this.mySubscribe.unsubscribe();
  }
  searchType(name:string) {
    this.router.navigate(['/search/type/' + name + '/1']);
    return false;
  }

  searchLabel(name:string) {
    this.router.navigate(['/search/label/' + name + '/1']);
    return false;
  }

  searchDate(name:string) {
    this.router.navigate(['/search/date/' + name + '/1']);
    return false;
  }

  toDetial(id:string) {
    this.router.navigate(['/detail/'+id]);
    return false;
  }

  toLogout() {
    this.store$.select('authReducer').dispatch(new Logout())
  }

  searchKey(key:string) {
    key && this.router.navigate(['/search/key/'+key+'/1']);
  }
}
