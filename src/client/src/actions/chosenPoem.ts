import ChosenPoemActionCreator, { ShowPoemPreviewAction } from './interfaces/ChosenPoemActionCreator';
import ReduxAction from '../util/ReduxAction';
import Poem from '../website/components/poem/model/poem';

export const SHOW_POEM_PREVIEW = 'SHOW_POEM_PREVIEW';
export const CLOSE_POEM_PREVIEW = 'CLOSE_POEM_PREVIEW';

const chosenPoemActionCreator: ChosenPoemActionCreator = {
  showPoemPreview(poem: Poem): ShowPoemPreviewAction {
    return {
      type: SHOW_POEM_PREVIEW,
      poem,
    };
  },
  closePoemPreview(): ReduxAction {
    return {
      type: CLOSE_POEM_PREVIEW,
    };
  },
};

export default chosenPoemActionCreator;
