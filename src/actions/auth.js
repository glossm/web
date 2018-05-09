import axios from 'axios';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';

function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function verifyToken() {
  return async function f(dispatch, getState) {
    const { token } = getState().auth;
    try {
      await axios.post('accounts/token/verify/', { token });
    } catch (error) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  };
}

function login(username, password) {
  return async function f(dispatch) {
    const response = await axios.post('accounts/login/', { username, password });
    const { token, user } = response.data;
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
}

function logout() {
  return async function f(dispatch) {
    await axios.post('accounts/logout/');
    dispatch(setToken(null));
    dispatch(setUser(null));
  };
}

export { verifyToken, login, logout };
