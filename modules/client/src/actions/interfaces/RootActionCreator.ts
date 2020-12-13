import ChosenPoemActionCreator from './ChosenPoemActionCreator';
import LoadedPoemsActionCreator from './LoadedPoemsActionCreator';
import AllTagsActionCreator from './AllTagsActionCreator';
import UserActionCreator from './UserActionCreator';

export default interface RootActionCreator {
  chosenPoem: ChosenPoemActionCreator;
  loadedPoems: LoadedPoemsActionCreator;
  allTags: AllTagsActionCreator;
  user: UserActionCreator;
}
