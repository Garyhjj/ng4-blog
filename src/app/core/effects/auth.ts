import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs';

import * as root from '../actions';

@Injectable()
export class AuthEffects {
  constructor(private store$: Store<any>,private actions$: Actions) {}
  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType<root.Logout>(root.LOGOUT)
    .switchMap(query => {
      localStorage.removeItem('id_token');
      this.store$.dispatch(new root.Update(0))
      return Observable.of(new root.LogoutAndInit())
    });
}
