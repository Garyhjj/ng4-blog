import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { Subscription }           from 'rxjs/Subscription';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'my-aside',
  templateUrl: 'aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  @Input() opt:any;
  mySubscribe: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
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
  }

  searchLabel(name:string) {
    this.router.navigate(['/search/label/' + name + '/1']);
  }

  searchDate(name:string) {
    this.router.navigate(['/search/date/' + name + '/1']);
  }

  toDetial(id:string) {
    this.router.navigate(['./detail/'+id]);
  }
}
