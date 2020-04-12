import _ from 'lodash';
import { Dispatch, Action, bindActionCreators } from 'redux';
import { ComponentClass, FunctionComponent } from 'react';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import rootActionCreator from '../actions';
import RootActionCreator from '../actions/interfaces/RootActionCreator';

const mapStateToProps: MapStateToPropsParam<any, any> = (state: any): any => ({
  state,
});

const mapDispatchToProps: MapDispatchToPropsParam<RootActionCreator, any> = (
  dispatch: Dispatch<Action>,
): any => {
  const actions = _.mapValues(rootActionCreator,
    (actionCreator) => bindActionCreators(actionCreator as any, dispatch));

  return {
    actions,
  };
};

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
  return { ...stateProps, ...dispatchProps, ...ownProps };
};

const connectStore = (component: ComponentClass<any> | FunctionComponent<any>) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(component);

export default connectStore;
