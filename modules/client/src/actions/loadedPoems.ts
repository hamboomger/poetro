import axios from 'axios';
import LoadedPoemsActionCreator, { ApplyFilterAction, PoemsLoadedActon } from './interfaces/LoadedPoemsActionCreator';
import AppThunk from '../util/AppThunk';
import { LoadedPoemsFilter } from '../models/state/LoadedPoemsState';

export const POEMS_LOADING = 'POEMS_LOADING';
export const POEMS_LOADED = 'POEMS_LOADED';
export const POEMS_LOADING_FAILED = 'POEMS_LOADING_FAILED';
export const APPLY_FILTER = 'APPLY_FILTER';

const loadedPoemsActionCreator: LoadedPoemsActionCreator = {
  fetchPoems(): AppThunk {
    return (dispatch) => {
      dispatch({ type: POEMS_LOADING });
      axios.get('/api/poems')
        .then((response) => {
          setTimeout(() => {
            dispatch<PoemsLoadedActon>({ type: POEMS_LOADED, payload: response.data });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: POEMS_LOADING_FAILED });
        });
    };
  },
  applyFilter(filter: LoadedPoemsFilter): ApplyFilterAction {
    return {
      type: APPLY_FILTER,
      payload: filter,
    };
  },
};

export default loadedPoemsActionCreator;
