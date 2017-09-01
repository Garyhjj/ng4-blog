import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] login';
export const LOGOUT = '[Auth] logout';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions = Login | Logout;
