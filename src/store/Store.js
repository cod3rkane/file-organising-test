import { createStore, combineReducers } from 'redux';

import { Files } from './Files';

const reducers = combineReducers({
  Files
});

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
