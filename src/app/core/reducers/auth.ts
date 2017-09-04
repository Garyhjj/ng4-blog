import * as auth from '../actions/auth';
import { JwtHelper } from 'angular2-jwt';

export interface State {
  auth: boolean;
}

const initialState: State = {
  auth: false,
};

export function authReducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN:
      localStorage.setItem('id_token',action.payload);
      return {
        auth: true,
      };
    case auth.LOGOUT_AND_INIT:
      return {
        auth: false,
      };

    case auth.INIT:
      let token = localStorage.getItem('id_token');
      return token? {
        auth: !new JwtHelper().isTokenExpired(token)
      }:{
        auth: false
      }
    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;
