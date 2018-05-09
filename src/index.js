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

import { verifyToken } from './actions/auth';
import reducers from './reducers';
import './index.css';

const history = createBrowserHistory();
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

axios.defaults.baseURL = 'http://api.glossm.com';
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(verifyToken());
    }
    return Promise.reject(error);
  },
);

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
