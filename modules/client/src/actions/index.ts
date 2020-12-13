import chosenPoemActionCreator from './chosenPoem';
import RootActionCreator from './interfaces/RootActionCreator';
import loadedPoemsActionCreator from './loadedPoems';
import allTagsActionCreator from './allTags';
import userActionCreator from './user';

const rootActionCreator: RootActionCreator = {
  chosenPoem: chosenPoemActionCreator,
  loadedPoems: loadedPoemsActionCreator,
  allTags: allTagsActionCreator,
  user: userActionCreator,
};

export default rootActionCreator;
