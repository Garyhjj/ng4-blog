import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

@Component({
  selector: 'my-aside',
  templateUrl: 'aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  @Input() opt:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {

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
