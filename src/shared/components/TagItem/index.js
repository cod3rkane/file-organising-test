import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';

export const TagItem = ({ tag, files }) => {
  return (
    <ListItem button>
      <span>{`${tag} (${files})`}</span>
    </ListItem>
  );
};

TagItem.propTypes = {
  tag: PropTypes.string.isRequired,
  files: PropTypes.string,
};
