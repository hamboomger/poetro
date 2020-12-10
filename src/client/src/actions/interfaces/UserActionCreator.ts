import ReduxAction from '../../util/ReduxAction';
import AppThunk from '../../util/AppThunk';
import ReduxPayloadAction from '../../util/ReduxPayloadAction';

export interface SetJwtTokenAction extends ReduxAction {
  payload: string,
}

interface UserActionCreator {
  setUserName(userName: string): ReduxPayloadAction<String>
}

export default UserActionCreator;
