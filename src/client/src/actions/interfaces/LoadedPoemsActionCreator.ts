import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';
import Poem from '../../website/components/poem/model/poem';

export interface PoemsLoadedActon extends ReduxAction {
  payload: Poem[];
}

export default interface LoadedPoemsActionCreator {
  fetchPoems(): AppThunk;
}
