import { REQUEST_RECORDS, RECEIVE_RECORDS, CHECK_AS_LEANRED } from '../actions/transcription';

const initialState = {
  records: [],
  fetchingRecords: false,
};

function transcription(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RECORDS:
      return { ...state, fetchingRecords: true };
    case RECEIVE_RECORDS:
      return {
        ...state,
        records: action.records,
        fetchingRecords: false,
      };
    case CHECK_AS_LEANRED: {
      const { records } = state;
      const record = records.find(r => r.id === action.recordId);
      record.learned = true;
      return { ...state, records };
    }
    default:
      return state;
  }
}

export default transcription;
