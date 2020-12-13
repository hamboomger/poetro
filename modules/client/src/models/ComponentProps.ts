import ApplicationState from './state/ApplicationState';
import RootActionCreator from '../actions/interfaces/RootActionCreator';

export default interface ComponentProps {
  state: ApplicationState,
  actions: RootActionCreator,
}
