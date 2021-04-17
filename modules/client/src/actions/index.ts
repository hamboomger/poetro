import chosenPoemActionCreator from './chosenPoem';
import RootActionCreator from './interfaces/RootActionCreator';
import loadedPoemsActionCreator from './loadedPoems';
import tagsActionCreator from './tags';
import userActionCreator from './user';

const rootActionCreator: RootActionCreator = {
  chosenPoem: chosenPoemActionCreator,
  loadedPoems: loadedPoemsActionCreator,
  tags: tagsActionCreator,
  user: userActionCreator,
};

export default rootActionCreator;
