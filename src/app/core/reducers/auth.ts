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
      if(token) {
        let mes = token.split(' ');
        return {
          auth: !new JwtHelper().isTokenExpired(mes.length>1?mes[1]:mes[0])
        }
      } else {
        return {
          auth: false
        }
      }
    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;
