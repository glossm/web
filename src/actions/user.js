import axios from 'axios';

import { setToken } from './auth';

export const SET_USER = 'SET_USER';

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function login(username, password) {
  return async function f(dispatch) {
    const response = await axios.post('accounts/login/', { username, password });
    const { token, user } = response.data;
    dispatch(setUser(user));
    dispatch(setToken(token));
  };
}

function logout() {
  return async function f(dispatch) {
    await axios.post('accounts/logout/');
    dispatch(setUser(null));
    dispatch(setToken(null));
  };
}

export { login, logout };
