import ChosenPoemActionCreator from './ChosenPoemActionCreator';
import LoadedPoemsActionCreator from './LoadedPoemsActionCreator';
import UserActionCreator from './UserActionCreator';
import TagsActionCreator from './TagsActionCreator';

export default interface RootActionCreator {
  chosenPoem: ChosenPoemActionCreator;
  loadedPoems: LoadedPoemsActionCreator;
  tags: TagsActionCreator;
  user: UserActionCreator;
}
