import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';
import { TagView } from '../../models/state/AllTagsState';

export interface TagsLoadedAction extends ReduxAction {
  payload: TagView[],
}

export interface AddAnyNewTagsAction extends ReduxAction {
  payload: TagView[];
}

interface AllTagsActionCreator {
  loadAllTags(): AppThunk
  addAnyNewTags(tags: TagView[]): AddAnyNewTagsAction
}

export default AllTagsActionCreator;
