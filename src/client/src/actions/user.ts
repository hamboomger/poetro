import UserActionCreator from './interfaces/UserActionCreator';
import ReduxPayloadAction from '../util/ReduxPayloadAction';

export const SET_USER_NAME = 'SET_USER_NAME';

const userActionCreator: UserActionCreator = {
  setUserName(userName: string): ReduxPayloadAction<String> {
    return {
      type: SET_USER_NAME,
      payload: userName,
    };
  },
};

export default userActionCreator;
