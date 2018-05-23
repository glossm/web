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
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      if (!token) throw new Error();
      await axios.post('accounts/token/verify/', { token });
      dispatch(setToken(token));
      const { data } = await axios.get('accounts/user/');
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  };
}

function signUp(username, email, password1, password2) {
  return async (dispatch) => {
    const response = await axios.post('accounts/registration/', {
      username,
      email,
      password1,
      password2,
    });
    const { token, user } = response.data;
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
}

function login(username, password) {
  return async (dispatch) => {
    const response = await axios.post('accounts/login/', { username, password });
    const { token, user } = response.data;
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
}

function logout() {
  return async (dispatch) => {
    await axios.post('accounts/logout/');
    dispatch(setToken(null));
    dispatch(setUser(null));
  };
}

export { verifyToken, signUp, login, logout };
