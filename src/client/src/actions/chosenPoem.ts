import axios from 'axios';
import AppThunk from '../util/AppThunk';
import ReduxAction from '../util/ReduxAction';
import Poem from '../website/components/poem/model/poem';
import ChosenPoemActionCreator, {
  PoemDeletedAction,
  PoemLoadedAction,
  ShowPoemPreviewAction,
} from './interfaces/ChosenPoemActionCreator';

export const SHOW_POEM_PREVIEW = 'SHOW_POEM_PREVIEW';
export const CLOSE_POEM_PREVIEW = 'CLOSE_POEM_PREVIEW';
export const POEM_LOADING = 'POEM_LOADING';
export const POEM_LOADED = 'POEM_LOADED';
export const POEM_LOADING_FAILED = 'POEM_LOADING_FAILED';
export const POEM_DELETING = 'POEM_DELETING';
export const POEM_DELETED = 'POEM_DELETED';
export const POEM_DELETION_FAILED = 'POEM_DELETION_FAILED';

const chosenPoemActionCreator: ChosenPoemActionCreator = {
  loadPoem(poemId: string): AppThunk {
    return ((dispatch) => {
      dispatch({ type: POEM_LOADING });
      axios.get(`/api/poem/${poemId}`)
        .then((response) => {
          setTimeout(() => {
            dispatch<PoemLoadedAction>({ type: POEM_LOADED, payload: response.data });
          }, 1000);
        })
        .catch((error) => {
          console.log(`Error fetching poem: ${error}`);
          dispatch({ type: POEM_LOADING_FAILED });
        });
    });
  },
  deletePoem(poemId: string): AppThunk {
    return (dispatch) => {
      dispatch({ type: POEM_DELETING });
      axios.delete(`/api/poem/${poemId}`)
        .then(() => {
          dispatch<PoemDeletedAction>({
            type: POEM_DELETED,
            deletedPoemId: poemId,
          });
          dispatch(this.closePoemPreview());
        })
        .catch((error) => {
          console.log(`Error deleting poem with id ${poemId}:`, error);
          dispatch({ type: POEM_DELETION_FAILED });
        });
    };
  },
  showPoemPreview(poem: Poem): ShowPoemPreviewAction {
    return {
      type: SHOW_POEM_PREVIEW,
      payload: poem,
    };
  },
  closePoemPreview(): ReduxAction {
    return {
      type: CLOSE_POEM_PREVIEW,
    };
  },
};

export default chosenPoemActionCreator;
