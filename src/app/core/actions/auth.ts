import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] login';
export const LOGOUT = '[Auth] logout';
export const LOGOUT_AND_INIT = '[Auth] logout and init';
export const INIT = '[Auth] init';

export class Login implements Action {
  readonly type = LOGIN;
  payload:string;
  constructor(token:string) {
    this.payload = token;
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LogoutAndInit implements Action {
  readonly type = LOGOUT_AND_INIT;
}

export class Init implements Action {
  readonly type = INIT;
}

export type Actions = Login | Logout | Init | LogoutAndInit;
