import axios from 'axios';

export const SET_USER = 'SET_USER';

// Not an action
function setToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    sessionStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    sessionStorage.removeItem('token');
  }
}

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function fetchUser() {
  return async (dispatch) => {
    const { data } = await axios.get('accounts/user/');
    dispatch(setUser(data));
  };
}

function verifyToken() {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token');
    try {
      if (!token) throw new Error();
      await axios.post('accounts/token/verify/', { token });
      setToken(token);
      await dispatch(fetchUser());
    } catch (error) {
      setToken(null);
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
    setToken(token);
    dispatch(setUser(user));
  };
}

function login(username, password) {
  return async (dispatch) => {
    const response = await axios.post('accounts/login/', { username, password });
    const { token, user } = response.data;
    setToken(token);
    dispatch(setUser(user));
  };
}

function logout() {
  return async (dispatch) => {
    await axios.post('accounts/logout/');
    setToken(null);
    dispatch(setUser(null));
  };
}

export { fetchUser, verifyToken, signUp, login, logout };
