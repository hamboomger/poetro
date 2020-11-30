import ReduxAction from '../../util/ReduxAction';
import AppThunk from '../../util/AppThunk';

export interface SetJwtTokenAction extends ReduxAction {
  payload: string,
}

interface UserActionCreator {
  createDummyPoem(): AppThunk
}

export default UserActionCreator;
