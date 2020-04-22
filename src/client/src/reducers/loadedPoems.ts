import LoadedPoemsState from '../models/state/LoadedPoemsState';
import ReduxAction from '../util/ReduxAction';
import { POEMS_LOADED, POEMS_LOADING, POEMS_LOADING_FAILED } from '../actions/loadedPoems';
import { PoemsLoadedActon } from '../actions/interfaces/LoadedPoemsActionCreator';

const initialState: LoadedPoemsState = {
  data: [],
  isFetching: false,
};

function loadedPoemsReducer(state = initialState, action: ReduxAction): LoadedPoemsState {
  switch (action.type) {
    case POEMS_LOADING:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case POEMS_LOADED:
      return {
        ...state,
        isFetching: false,
        data: (action as PoemsLoadedActon).payload,
      };
    case POEMS_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default loadedPoemsReducer;
