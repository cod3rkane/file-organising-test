import { List } from 'immutable';

export const SET_FILE = 'SET_FILE';

const initialState = List();

export const Files = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
