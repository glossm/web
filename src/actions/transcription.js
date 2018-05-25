import axios from 'axios';

export const REQUEST_RECORDS = 'REQUEST_RECORDS';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const CHECK_AS_LEANRED = 'CHECK_AS_LEANRED';

function requestRecords() {
  return {
    type: REQUEST_RECORDS,
  };
}

function receiveRecords(records) {
  return {
    type: RECEIVE_RECORDS,
    records,
  };
}

function fetchRecords(langId, topicId) {
  return async (dispatch) => {
    dispatch(requestRecords());
    const { data } = await axios.get(`core/languages/${langId}/topics/${topicId}/records/`);
    dispatch(receiveRecords(data));
  };
}

function checkAsLearned(recordId) {
  return {
    type: CHECK_AS_LEANRED,
    recordId,
  };
}

export { fetchRecords, checkAsLearned };
