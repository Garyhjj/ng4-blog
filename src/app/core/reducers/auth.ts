import * as auth from '../actions/auth';

export interface State {
  auth: boolean;
}

const initialState: State = {
  auth: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN:
      return {
        auth: true,
      };

    case auth.LOGOUT:
      return {
        auth: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.auth;
