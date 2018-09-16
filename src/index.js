import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Routes } from './Routes';
import Store from './store/Store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
