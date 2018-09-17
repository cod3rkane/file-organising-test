import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';

import './style.css';

export const TagItem = ({ tag, files }) => {
  // @TODO change page number dinamically.
  const linkTo = `/page/1/${tag}`;
  return (
    <ListItem button className="tag-item">
      <NavLink to={linkTo}>
        <span>{`${tag} (${files})`}</span>
      </NavLink>
    </ListItem>
  );
};

TagItem.propTypes = {
  tag: PropTypes.string.isRequired,
  files: PropTypes.string,
};
