import { combineReducers } from 'redux';
import chosenPoem from './chosenPoem';
import loadedPoems from './loadedPoems';
import allTags from './allTags';

const rootReducer = combineReducers({
  chosenPoem,
  loadedPoems,
  allTags,
});

export default rootReducer;
