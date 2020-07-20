import AllTagsState from '../models/state/AllTagsState';
import { AnyAction as Action } from 'redux';
import { TAGS_LOADING } from '../actions/allTags';
import UserState from '../models/state/UserState';
import { CLEAR_JWT_TOKEN, SET_JWT_TOKEN } from '../actions/user';
import { SetJwtTokenAction } from '../actions/interfaces/UserActionCreator';

const initialState: UserState = {
  jwtToken: undefined,
};

function userReducer(state: UserState = initialState, action: Action): UserState {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return {
        ...state,
        jwtToken: (action as SetJwtTokenAction).payload,
      };
    case CLEAR_JWT_TOKEN:
      return {
        ...state,
        jwtToken: undefined,
      };
    default:
      return state;
  }
}

export default userReducer;
