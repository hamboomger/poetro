import ReduxAction from '../../util/ReduxAction';
import Poem from '../../website/components/poem/model/poem';
import AppThunk from '../../util/AppThunk';

export interface ShowPoemPreviewAction extends ReduxAction {
  payload: Poem,
}

export interface PoemLoadedAction extends ReduxAction {
  payload: Poem,
}

interface ChosenPoemActionCreator {
  showPoemPreview(poem: Poem): ShowPoemPreviewAction;
  closePoemPreview(): ReduxAction;
  loadPoem(poemId: string): AppThunk;
}

export default ChosenPoemActionCreator;
