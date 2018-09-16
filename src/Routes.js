import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './containers/home/App';

const NoMatch = () => {
  return (
    <Fragment>
      404 Page not Found.
    </Fragment>
  );
};

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NoMatch}/>
    </Switch>
  );
};
