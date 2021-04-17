import ChosenPoemState from './ChosenPoemState';
import LoadedPoemsState from './LoadedPoemsState';
import UserState from './UserState';
import TagsState from './TagsState';

export default interface ApplicationState {
  chosenPoem: ChosenPoemState,
  loadedPoems: LoadedPoemsState,
  tags: TagsState,
  user: UserState,
}
