import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import './i18n/i18n';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { verifyToken } from './actions/auth';
import reducers from './reducers';
import './index.css';
import './creative.css';

import './styles/styles';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faLaptopCode, faHeart, faUsers, faExclamationCircle, faGlobe} from '@fortawesome/free-solid-svg-icons'

library.add(faGem, faLaptopCode, faGlobe, faHeart, faUsers, faExclamationCircle);

const history = createBrowserHistory();
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

axios.defaults.baseURL = 'http://13.124.172.50:8000';
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(verifyToken());
    } else {
      console.log(error);
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

async function start() {
  await store.dispatch(verifyToken());
  ReactDOM.render(router, document.getElementById('root'));
  registerServiceWorker();
}

start();
