import { AnyAction as Action } from 'redux';
import {
  CLOSE_POEM_PREVIEW,
  POEM_LOADED,
  POEM_LOADING,
  POEM_LOADING_FAILED,
  SHOW_POEM_PREVIEW
} from '../actions/chosenPoem';
import ChosenPoemState from '../models/state/ChosenPoemState';
import { PoemLoadedAction, ShowPoemPreviewAction } from '../actions/interfaces/ChosenPoemActionCreator';

const initialState: ChosenPoemState = {
  poem: undefined,
  viewType: undefined,
  isFetching: false,
};

function chosenPoemReducer(state: ChosenPoemState = initialState, action: Action): ChosenPoemState {
  switch (action.type) {
    case POEM_LOADING:
      return {
        ...state,
        isFetching: true,
        poem: undefined,
      };
    case POEM_LOADED:
      return {
        ...state,
        isFetching: false,
        poem: (action as PoemLoadedAction).payload,
      };
    case POEM_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case SHOW_POEM_PREVIEW:
      return {
        ...state,
        poem: (action as ShowPoemPreviewAction).payload,
        viewType: 'modal',
      };
    case CLOSE_POEM_PREVIEW:
      return {
        ...state,
        poem: undefined,
        viewType: undefined,
      };
    default:
      return state;
  }
}

export default chosenPoemReducer;
