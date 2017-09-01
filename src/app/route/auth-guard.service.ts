import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private store$: Store<any>){console.log(store$.select('reducer').subscribe((i)=>console.log(i)))}
  canActivate() {
    let token = localStorage.getItem('id_token');
    if(!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
