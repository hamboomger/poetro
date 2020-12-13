import ReduxAction from './ReduxAction';

interface ReduxPayloadAction<T> extends ReduxAction {
  payload: T
}

export default ReduxPayloadAction;
