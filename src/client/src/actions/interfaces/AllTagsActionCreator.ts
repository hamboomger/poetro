import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';

export interface TagsLoadedAction extends ReduxAction {
  payload: string[],
}

interface AllTagsActionCreator {
  loadAllTags(): AppThunk
}

export default AllTagsActionCreator;
