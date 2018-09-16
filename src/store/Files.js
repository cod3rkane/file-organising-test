import { List } from 'immutable';

import { FileEntity } from '../entities/File';

export const UPDATE_FILES = 'UPDATE_FILES';
export const SELECTED_FILE = 'SELECTED_FILE';

// actions
export const actionUpdateFiles = (files, total) => {
  return {
    type: UPDATE_FILES,
    payload: { files, total },
  };
}; 

export const actionSelectFile = (file) => {
  return {
    type: SELECTED_FILE,
    payload: file,
  };
};

const initialState = {
  files: List(),
  total: undefined,
  selected: undefined,
};

export const Files = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILES:
      const files = action.payload.files.map(f => new FileEntity({ ...f }));
      const newState = { files, total: action.payload.total };

      return newState
    case SELECTED_FILE:
      const file = action.payload;
      return { ...state, selected: file };
    default:
      return state;
  }
};
