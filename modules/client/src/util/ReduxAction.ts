import Redux from 'redux';

interface ReduxAction extends Redux.Action {
  type: string,
}

export default ReduxAction;
