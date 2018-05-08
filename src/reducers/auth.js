import axios from 'axios';

import { SET_TOKEN } from '../actions/auth';

const initialState = {
  token: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      const { token } = action;
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      return { ...state, token };
    }
    default:
      return state;
  }
}

export default auth;
