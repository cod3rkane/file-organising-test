import React from 'react';
import PropTypes from 'prop-types';
import FileCopy from '@material-ui/icons/FileCopy';
import { NavLink } from 'react-router-dom';

import './style.css'

export const FileItem = ({ file, link, onClick }) => {
  return (
    <div className="file-item">
      <FileCopy className="file" />
      <NavLink to={link} className="file-link" onClick={() => onClick(file)}>
        <span>{file.name}</span>
      </NavLink>
    </div>
  );
};

PropTypes.propTypes = {
  file: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
