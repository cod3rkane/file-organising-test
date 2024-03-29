import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.css';

class Paginate extends React.Component {
  render() {
    const { max, min, tag } = this.props;
    const items = new Array(max).slice(min - 1, max).fill(1).map((v, i) => <NavLink key={i} to={`/page/${i + 1}/${tag}`}>{i + 1}</NavLink>)
    return (
      <div className="paginate">
        {items}
      </div>
    );
  }
};

Paginate.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  selected: PropTypes.number,
  tag: PropTypes.string,
};

export default Paginate;
