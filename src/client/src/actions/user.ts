import UserActionCreator, { SetJwtTokenAction } from './interfaces/UserActionCreator';
import ReduxAction from '../util/ReduxAction';

export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const CLEAR_JWT_TOKEN = 'CLEAR_JWT_TOKEN';

const userActionCreator: UserActionCreator = {
  setJwtToken(jwtToken: string): SetJwtTokenAction {
    return {
      type: SET_JWT_TOKEN,
      payload: jwtToken,
    };
  },
  clearJwtToken(): ReduxAction {
    return { type: CLEAR_JWT_TOKEN };
  },
};

export default userActionCreator;
