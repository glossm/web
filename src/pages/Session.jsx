import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Loader } from 'semantic-ui-react';
import axios from 'axios';

import { fetchRecords, checkAsLearned } from '../actions/transcription';
import AnswerSession from '../components/AnswerSession';
import CompletedSession from '../components/CompletedSession';
import ResultSession from '../components/ResultSession';
import Record from '../models/Record';
const mapStateToProps = state => ({
  records: state.transcription.records,
  fetchingRecords: state.transcription.fetchingRecords,
});

const mapDispatchToProps = dispatch => ({
  onFetchRecords: (langId, topicId) => dispatch(fetchRecords(langId, topicId)),
  onCheck: recordId => dispatch(checkAsLearned(recordId)),
});

const propTypes = {
  records: PropTypes.arrayOf(Record).isRequired,
  fetchingRecords: PropTypes.bool.isRequired,
  onFetchRecords: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const ANSWER = 'ANSWER';
const RESULT = 'RESULT';
const COMPLETED = 'COMPLETED';

class Session extends Component {
  state = {
    sessionType: ANSWER,
    record: null,
    answer: null,
    score: null,
    topAnswers: [],
  }

  async componentWillMount() {
    const { onFetchRecords, match } = this.props;
    const { langId, topicId } = match.params;
    await onFetchRecords(langId, topicId);
    this.onNext();
    
  
  }

  onSubmit = async (answer) => {
    const { onCheck } = this.props;
    const { record } = this.state;
    const { data } = await axios.post('transcription/submit/', { record: record.id, answer });
    const { score, topAnswers } = data;
   
    
    onCheck(record.id);
    this.setState({ sessionType: RESULT, answer, score, topAnswers });
  };
  onNext = () => {
    const { records } = this.props;
    const record = records.find(r => !r.learned);
    if (record) {
      this.setState({ sessionType: ANSWER, record });
    } else {
      this.setState({ sessionType: COMPLETED });
    }
  };
  onGoBack = () => {
    const { match, history } = this.props;
    const { langId } = match.params;
    history.push(`/learn/l${langId}`);
  };

  render() {
    const { fetchingRecords } = this.props;
    const { sessionType, record, answer, score, topAnswers } = this.state;
    // console.log("records a: ",this.state);
    const RenderedAnswerSession = () => (
      
      <AnswerSession
        
        audio={record.audio}
        meaning={record.meaning}
        onSubmit={this.onSubmit}
        image = {record.video}

      />
    );
    const RenderedResultSession = () => (
      <ResultSession
        answer={answer}
        score={score}
        topAnswers={topAnswers}
        onNext={this.onNext}
      />
    );
    const RenderedCompletedSession = () => (
      <CompletedSession
        onGoBack={this.onGoBack}
      />
    );
    // const tableSession =()=>{
      
    // }
    return (
      <Container text>
        <Loader active={fetchingRecords} />
        {/*보여지는것 */}
        {sessionType === ANSWER && record && <RenderedAnswerSession />}
        {/*결과 */}
        {sessionType === RESULT && <RenderedResultSession />}
        {sessionType === COMPLETED && <RenderedCompletedSession />}
      </Container>
    );
  }
}

Session.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Session);
