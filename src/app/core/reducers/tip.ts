import * as tip from '../actions/tip';

export interface TipState {
  tip: number;
}

const initialState: TipState = {
  tip: 0,
};

export function tipReducer (state = initialState, action: tip.TipActions) {
  switch (action.type) {
    case tip.UPDATE:
      return {
        tip: action.payload
      }
    default:
      return state;
  }
}
