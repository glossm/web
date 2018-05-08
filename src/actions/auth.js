export const SET_TOKEN = 'SET_TOKEN';

function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export { setToken };
