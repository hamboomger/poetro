import UserActionCreator, { SetJwtTokenAction } from './interfaces/UserActionCreator';
import ReduxAction from '../util/ReduxAction';
import AppThunk from "../util/AppThunk";

export const DUMMY_POEM_IS_CREATING = 'DUMMY_POEM_IS_CREATING';
export const DUMMY_POEM_IS_CREATED = 'DUMMY_POEM_IS_CREATED';
export const CLEAR_JWT_TOKEN = 'CLEAR_JWT_TOKEN';

const dummyPoem

const userActionCreator: UserActionCreator = {
  createDummyPoem(): AppThunk {
    return ((dispatch) => {

    });
  }
};

export default userActionCreator;
