import { AnyAction as Action } from 'redux';
import { CLOSE_POEM_PREVIEW, SHOW_POEM_PREVIEW } from '../actions/chosenPoem';
import ChosenPoemState from '../models/state/ChosenPoemState';
import { ShowPoemPreviewAction } from '../actions/interfaces/ChosenPoemActionCreator';

const initialState: ChosenPoemState = {
  poem: undefined,
  viewType: undefined,
};

function chosenPoemReducer(state: ChosenPoemState = initialState, action: Action): ChosenPoemState {
  switch (action.type) {
    case SHOW_POEM_PREVIEW:
      return {
        ...state,
        poem: (action as ShowPoemPreviewAction).poem,
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
