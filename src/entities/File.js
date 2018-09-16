import { Record, List } from 'immutable';

export const FileEntity = Record({
  id: undefined,
  name: undefined,
  tags: List(),
});
