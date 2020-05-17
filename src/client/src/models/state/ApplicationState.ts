import ChosenPoemState from './ChosenPoemState';
import LoadedPoemsState from './LoadedPoemsState';
import AllTagsState from './AllTagsState';

export default interface ApplicationState {
  chosenPoem: ChosenPoemState,
  loadedPoems: LoadedPoemsState,
  allTags: AllTagsState,
}
