import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import './index.css';

axios.defaults.baseURL = 'http://api.glossm.com';

const history = createBrowserHistory();
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

/* eslint-disable react/jsx-filename-extension */
const router = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
