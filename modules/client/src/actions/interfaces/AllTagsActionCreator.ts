import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';

export interface TagsLoadedAction extends ReduxAction {
  payload: string[],
}

export interface AddAnyNewTagsAction extends ReduxAction {
  payload: string[];
}

interface AllTagsActionCreator {
  loadAllTags(): AppThunk
  addAnyNewTags(tags: string[]): AddAnyNewTagsAction
}

export default AllTagsActionCreator;
