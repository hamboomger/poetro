import { AnyAction as Action } from 'redux';
import UserState from '../models/state/UserState';
import { SET_USER_NAME } from '../actions/user';
import ReduxPayloadAction from '../util/ReduxPayloadAction';

const initialState: UserState = {
  userName: undefined,
};

function userReducer(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: (action as ReduxPayloadAction<string>).payload,
      };
    default:
      return state;
  }
}

export default userReducer;
