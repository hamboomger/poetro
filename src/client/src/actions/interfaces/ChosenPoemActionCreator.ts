import ReduxAction from '../../util/ReduxAction';
import Poem from '../../website/components/poem/model/poem';

export interface ShowPoemPreviewAction extends ReduxAction {
  poem: Poem,
}

interface ChosenPoemActionCreator {
  showPoemPreview(poem: Poem): ShowPoemPreviewAction;
  closePoemPreview(): ReduxAction;
}

export default ChosenPoemActionCreator;
