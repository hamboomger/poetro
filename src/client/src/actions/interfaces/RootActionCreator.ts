import ChosenPoemActionCreator from './ChosenPoemActionCreator';
import LoadedPoemsActionCreator from './LoadedPoemsActionCreator';

export default interface RootActionCreator {
  chosenPoem: ChosenPoemActionCreator;
  loadedPoems: LoadedPoemsActionCreator;
}
