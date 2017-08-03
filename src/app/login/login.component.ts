import { Component, OnInit } from '@angular/core';

import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accountName:string='';
  password:string='';
  error:string='';
  constructor(
    private blogService: BlogService
  ) {  }

  ngOnInit() {}

  login() {
    let login = {accountName:this.accountName,password:this.password};
    if(login.accountName.length>2 && login.password.length > 7) {
      this.blogService.checkUser(login).then((res) => {
        localStorage.setItem('id_token',res.json().token);
        this.error = '登录成功'
        this.blogService.auth.next(true);
      }).catch((e) => {
        console.log(e)
        this.error = e._body;
      })
    }

    return false;
  }
}
