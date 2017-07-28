import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-aside',
  templateUrl: 'aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  @Input() opt:any;

  constructor() {  }

  ngOnInit() {
    console.log(this.opt)
  }
}
