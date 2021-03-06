import ReduxAction from '../../util/ReduxAction';
import Poem from '../../website/components/poem/model/poem';
import AppThunk from '../../util/AppThunk';

export interface ShowPoemPreviewAction extends ReduxAction {
  payload: Poem,
}

export interface PoemLoadedAction extends ReduxAction {
  payload: Poem,
}

export interface PoemDeletedAction extends ReduxAction {
  deletedPoemId: string,
}

export interface SetHidePoemTextAction extends ReduxAction {
  payload: boolean,
}

interface ChosenPoemActionCreator {
  showPoemPreview(poem: Poem): ShowPoemPreviewAction;
  closePoemPreview(): ReduxAction;
  clearChosenPoem(): ReduxAction;
  loadPoem(poemId: string): AppThunk;
  deletePoem(poemId: string): AppThunk;
  setHidePoemText(hideText: boolean): SetHidePoemTextAction;
}

export default ChosenPoemActionCreator;
