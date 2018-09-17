import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './containers/home/App';
import File from './containers/file';

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
      <Route path="/page/:page/:tag?" component={App} />
      <Route path="/file/:id" component={File} />
      <Route component={NoMatch}/>
    </Switch>
  );
};
