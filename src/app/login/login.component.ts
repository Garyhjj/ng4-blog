import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { authReducer } from '../core/reducers/auth';
import { Login } from '../core/actions/auth';
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
    private blogService: BlogService,
    private store$: Store<any>
  ) {  }

  ngOnInit() {}

  login() {
    let login = {accountName:this.accountName,password:this.password};
    if(login.accountName.length>2 && login.password.length > 7) {
      this.blogService.checkUser(login).then((res) => {
        this.error = '登录成功'
        this.store$.select('authReducer').dispatch(new Login(res.json().token));
      }).catch((e) => {
        console.log(e)
        this.error = e._body;
      })
    }

    return false;
  }
}
