import AppThunk from '../../util/AppThunk';
import ReduxAction from '../../util/ReduxAction';
import { TagView } from '../../models/state/TagsState';

export interface TagsLoadedAction extends ReduxAction {
  payload: TagView[],
}

export interface AddAnyNewTagsAction extends ReduxAction {
  payload: TagView[];
}

export interface TagColorChangedAction extends ReduxAction {
  tagId: string,
  newColor: string
}

interface TagsActionCreator {
  loadAllTags(): AppThunk;
  addAnyNewTags(tags: TagView[]): AddAnyNewTagsAction
  changeTagColor(tagId: string, newColor: string): AppThunk
}

export default TagsActionCreator;
