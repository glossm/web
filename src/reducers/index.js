import { combineReducers } from 'redux';

import auth from './auth';
import transcription from './transcription';

const reducers = combineReducers({
  auth,
  transcription,
});

export default reducers;
