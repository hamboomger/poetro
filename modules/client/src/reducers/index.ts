import { combineReducers } from 'redux';
import chosenPoem from './chosenPoem';
import loadedPoems from './loadedPoems';
import tags from './tags';
import user from './user';

const rootReducer = combineReducers({
  chosenPoem,
  loadedPoems,
  tags,
  user,
});

export default rootReducer;
