import React from 'react';
import PropTypes from 'prop-types';
import FileCopy from '@material-ui/icons/FileCopy';
import { NavLink } from 'react-router-dom';

import './style.css'

export const FileItem = ({ id, name, link }) => {
  return (
    <div className="file-item">
      <FileCopy className="file" />
      <NavLink to={link} className="file-link">
        <span>{name}</span>
      </NavLink>
    </div>
  );
};

PropTypes.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
