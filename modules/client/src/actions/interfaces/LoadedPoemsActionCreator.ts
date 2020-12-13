import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';
import Poem from '../../website/components/poem/model/poem';
import { LoadedPoemsFilter } from '../../models/state/LoadedPoemsState';

export interface PoemsLoadedActon extends ReduxAction {
  payload: Poem[];
}

export interface ApplyFilterAction extends ReduxAction {
  payload: LoadedPoemsFilter;
}

export default interface LoadedPoemsActionCreator {
  fetchPoems(): AppThunk;
  applyFilter(filter: LoadedPoemsFilter): ApplyFilterAction;
}
