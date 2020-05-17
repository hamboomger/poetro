import chosenPoemActionCreator from './chosenPoem';
import RootActionCreator from './interfaces/RootActionCreator';
import loadedPoemsActionCreator from './loadedPoems';
import allTagsActionCreator from './allTags';

const rootActionCreator: RootActionCreator = {
  chosenPoem: chosenPoemActionCreator,
  loadedPoems: loadedPoemsActionCreator,
  allTags: allTagsActionCreator,
};

export default rootActionCreator;
