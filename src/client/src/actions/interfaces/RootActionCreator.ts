import ChosenPoemActionCreator from './ChosenPoemActionCreator';
import LoadedPoemsActionCreator from './LoadedPoemsActionCreator';
import AllTagsActionCreator from './AllTagsActionCreator';

export default interface RootActionCreator {
  chosenPoem: ChosenPoemActionCreator;
  loadedPoems: LoadedPoemsActionCreator;
  allTags: AllTagsActionCreator;
}
