import axios from 'axios';
import LoadedPoemsActionCreator, { PoemsLoadedActon } from './interfaces/LoadedPoemsActionCreator';
import AppThunk from '../util/AppThunk';

export const POEMS_LOADING = 'POEMS_LOADING';
export const POEMS_LOADED = 'POEMS_LOADED';
export const POEMS_LOADING_FAILED = 'POEMS_LOADING_FAILED';

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
};

export default loadedPoemsActionCreator;
