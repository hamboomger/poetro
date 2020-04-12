import ChosenPoemState from './ChosenPoemState';
import LoadedPoemsState from './LoadedPoemsState';

export default interface ApplicationState {
  chosenPoem: ChosenPoemState,
  loadedPoems: LoadedPoemsState,
}
