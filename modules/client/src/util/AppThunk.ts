import { ThunkAction } from 'redux-thunk';
import ApplicationState from '../models/state/ApplicationState';
import ReduxAction from './ReduxAction';

type AppThunk = ThunkAction<void, ApplicationState, unknown, ReduxAction>;

export default AppThunk;
