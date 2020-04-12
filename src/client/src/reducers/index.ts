import { combineReducers } from 'redux';
import chosenPoem from './chosenPoem';
import loadedPoems from './loadedPoems';

const rootReducer = combineReducers({
  chosenPoem,
  loadedPoems,
});

export default rootReducer;
