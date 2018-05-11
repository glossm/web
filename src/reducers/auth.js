import axios from 'axios';

import { SET_TOKEN, SET_USER } from '../actions/auth';

const initialState = {
  user: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      const { token } = action;
      if (token) {
        axios.defaults.headers.common.Authorization = `JWT ${token}`;
        sessionStorage.setItem('token', token);
      } else {
        delete axios.defaults.headers.common.Authorization;
        sessionStorage.removeItem('token');
      }
      return state;
    }
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default auth;
