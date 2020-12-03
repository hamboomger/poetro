import UserActionCreator from './interfaces/UserActionCreator';
import AppThunk from '../util/AppThunk';

export const DUMMY_POEM_IS_CREATING = 'DUMMY_POEM_IS_CREATING';
export const DUMMY_POEM_IS_CREATED = 'DUMMY_POEM_IS_CREATED';
export const CLEAR_JWT_TOKEN = 'CLEAR_JWT_TOKEN';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';

const userActionCreator: UserActionCreator = {
  createDummyPoem(): AppThunk {
    return (() => {

    });
  },
};

export default userActionCreator;
