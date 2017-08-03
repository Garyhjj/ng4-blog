import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  canActivate() {
    let token = localStorage.getItem('id_token');
    if(!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
