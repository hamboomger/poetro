import ChosenPoemState from './ChosenPoemState';
import LoadedPoemsState from './LoadedPoemsState';
import AllTagsState from './AllTagsState';
import UserState from './UserState';

export default interface ApplicationState {
  chosenPoem: ChosenPoemState,
  loadedPoems: LoadedPoemsState,
  allTags: AllTagsState,
  user: UserState,
}
