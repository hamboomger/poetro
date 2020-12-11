import { combineReducers } from 'redux';
import chosenPoem from './chosenPoem';
import loadedPoems from './loadedPoems';
import allTags from './allTags';
import user from './user';

const rootReducer = combineReducers({
  chosenPoem,
  loadedPoems,
  allTags,
  user,
});

export default rootReducer;
