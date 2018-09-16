import { List } from 'immutable';

import { FileEntity } from '../entities/File';

export const UPDATE_FILES = 'UPDATE_FILES';

// actions
export const actionUpdateFiles = (files, total) => {
  return {
    type: UPDATE_FILES,
    payload: { files, total },
  };
}; 

const initialState = {
  files: List(),
  total: undefined,
};

export const Files = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILES:
      const files = action.payload.files.map(f => new FileEntity({ ...f }));
      const newState = { files, total: action.payload.total };

      return newState
    default:
      return state;
  }
};
