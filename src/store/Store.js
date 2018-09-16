import { createStore, combineReducers } from 'redux';

import { Files } from './Files';
import { Tags } from './Tags';

const reducers = combineReducers({
  Files,
  Tags,
});

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
