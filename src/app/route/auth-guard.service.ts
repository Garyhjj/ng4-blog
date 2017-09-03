import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  auth:boolean;
  constructor(private store$: Store<any>){
    store$.select('authReducer').subscribe((store)=>this.auth = store.auth)
  }
  canActivate() {
    return this.auth;
  }
}
