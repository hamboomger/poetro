import _ from 'lodash';
import { AnyAction as Action } from 'redux';
import TagsState, { TagView } from '../models/state/TagsState';
import {
  ADD_ANY_NEW_TAGS,
  TAG_COLOR_CHANGED,
  TAG_COLOR_CHANGING,
  TAG_COLOR_CHANGING_FAILED,
  TAGS_LOADED,
  TAGS_LOADING,
  TAGS_LOADING_FAILED,
} from '../actions/tags';
import { AddAnyNewTagsAction, TagColorChangedAction, TagsLoadedAction } from '../actions/interfaces/TagsActionCreator';

const initialState: TagsState = {
  data: [],
  isFetching: false,
};

function addNewTags(allTags: TagView[], newTags: TagView[]) {
  return Array.from(new Set([...allTags, ...newTags])).sort();
}

function updateTagColor(allTags: TagView[], tagId: string, tagColor: string): TagView[] {
  return _.chain(allTags)
    .clone()
    .map((tag) => {
      if (tag.id === tagId) {
        return {
          ...tag,
          color: tagColor,
        };
      }
      return tag;
    })
    .value();
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
    case TAG_COLOR_CHANGING:
      return {
        ...state,
        isFetching: true,
      };
    case TAG_COLOR_CHANGING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case TAG_COLOR_CHANGED: {
      const changedColorAction = action as TagColorChangedAction;
      return {
        ...state,
        isFetching: false,
        data: updateTagColor(state.data, changedColorAction.tagId, changedColorAction.newColor),
      };
    }
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
