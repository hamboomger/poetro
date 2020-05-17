import { AnyAction as Action } from 'redux';
import AllTagsState from '../models/state/AllTagsState';
import { TAGS_LOADED, TAGS_LOADING, TAGS_LOADING_FAILED } from '../actions/allTags';
import { TagsLoadedAction } from '../actions/interfaces/AllTagsActionCreator';

const initialState: AllTagsState = {
  data: [],
  isFetching: false,
};

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
    default:
      return state;
  }
}

export default allTagsReducer;
