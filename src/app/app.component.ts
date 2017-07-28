import { Component } from '@angular/core';
import { APPConfig } from './shared/config/app.config';

import { BlogService } from './core/services/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = APPConfig.administrator;
  asideMes:any;
  constructor(private blogService: BlogService) {
    this.asideMes = this.blogService.initAside();
  }
}
