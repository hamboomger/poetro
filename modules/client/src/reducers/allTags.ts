import { AnyAction as Action } from 'redux';
import AllTagsState from '../models/state/AllTagsState';
import {
  ADD_ANY_NEW_TAGS, TAGS_LOADED, TAGS_LOADING, TAGS_LOADING_FAILED,
} from '../actions/allTags';
import { AddAnyNewTagsAction, TagsLoadedAction } from '../actions/interfaces/AllTagsActionCreator';

const initialState: AllTagsState = {
  data: [],
  isFetching: false,
};

function addNewTags(allTags: string[], tags: string[]) {
  console.log(`New tags: ${tags}`);
  return Array.from(new Set([...allTags, ...tags])).sort();
}

function allTagsReducer(state: AllTagsState = initialState, action: Action): AllTagsState {
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

export default allTagsReducer;
