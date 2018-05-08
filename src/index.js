import React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

/* eslint-disable react/jsx-filename-extension */
const router = (
  <Router history={createBrowserHistory()}>
    <App />
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
