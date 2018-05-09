import axios from 'axios';

import { SET_TOKEN, SET_USER } from '../actions/auth';

const initialState = {
  token: null,
  user: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      const { token } = action;
      axios.defaults.headers.common.Authorization = token ? `JWT ${token}` : undefined;
      return { ...state, token };
    }
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default auth;
