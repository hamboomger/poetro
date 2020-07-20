import ReduxAction from '../../util/ReduxAction';

export interface SetJwtTokenAction extends ReduxAction {
  payload: string,
}

interface UserActionCreator {
  setJwtToken(jwtToken: string): SetJwtTokenAction;
  clearJwtToken(): ReduxAction
}

export default UserActionCreator;
