import LoadedPoemsState from '../models/state/LoadedPoemsState';
import ReduxAction from '../util/ReduxAction';
import {
  APPLY_FILTER, POEMS_LOADED, POEMS_LOADING, POEMS_LOADING_FAILED,
} from '../actions/loadedPoems';
import { ApplyFilterAction, PoemsLoadedActon } from '../actions/interfaces/LoadedPoemsActionCreator';
import { POEM_DELETED } from '../actions/chosenPoem';
import { PoemDeletedAction } from '../actions/interfaces/ChosenPoemActionCreator';
import Poem from '../website/components/poem/model/poem';

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
    case POEM_DELETED:
      return {
        ...state,
        data: filterOutDeletedPoem(
          state.data,
          (action as PoemDeletedAction).deletedPoemId,
        ),
      };
    case APPLY_FILTER:
      return {
        ...state,
        filter: (action as ApplyFilterAction).payload,
      };
    default:
      return state;
  }
}

function filterOutDeletedPoem(poems: Poem[], poemId: string) {
  return poems.filter((poem) => poem._id !== poemId);
}

export default loadedPoemsReducer;
