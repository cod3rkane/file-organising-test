import { List } from 'immutable';

import { TagEntity } from '../entities/Tag';

const initialState = List();

export const Tags = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
