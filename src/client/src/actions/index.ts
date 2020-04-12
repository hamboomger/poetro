import chosenPoemActionCreator from './chosenPoem';
import RootActionCreator from './interfaces/RootActionCreator';
import loadedPoemsActionCreator from './loadedPoems';

const rootActionCreator: RootActionCreator = {
  chosenPoem: chosenPoemActionCreator,
  loadedPoems: loadedPoemsActionCreator,
};

export default rootActionCreator;
