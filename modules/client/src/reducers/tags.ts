import { AnyAction as Action } from 'redux';
import TagsState, { TagView } from '../models/state/TagsState';
import {
  ADD_ANY_NEW_TAGS, TAGS_LOADED, TAGS_LOADING, TAGS_LOADING_FAILED,
} from '../actions/tags';
import { AddAnyNewTagsAction, TagsLoadedAction } from '../actions/interfaces/TagsActionCreator';

const initialState: TagsState = {
  data: [],
  isFetching: false,
};

function addNewTags(allTags: TagView[], newTags: TagView[]) {
  return Array.from(new Set([...allTags, ...newTags])).sort();
}

function tagsReducer(state: TagsState = initialState, action: Action): TagsState {
  switch (action.type) {
    case TAGS_LOADING:
      return {
        ...state,
        isFetching: true,
      };
    case TAGS_LOADED:
      return {
        ...state,
        isFetching: false,
        data: (action as TagsLoadedAction).payload,
      };
    case TAGS_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case ADD_ANY_NEW_TAGS:
      return {
        ...state,
        data: addNewTags(
          state.data,
          (action as AddAnyNewTagsAction).payload,
        ),
      };
    default:
      return state;
  }
}

export default tagsReducer;
