import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Loader, Message } from 'semantic-ui-react';

import { fetchRecords } from '../actions/transcription';
import Record from '../models/Record';

const mapStateToProps = state => ({
  records: state.transcription.records,
});

const mapDispatchToProps = dispatch => ({
  onFetchRecords: (langId, topicId) => dispatch(fetchRecords(langId, topicId)),
});

const propTypes = {
  records: PropTypes.arrayOf(Record).isRequired,
  fetchingRecords: PropTypes.bool.isRequired,
  onFetchRecords: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
};

class Session extends Component {
  componentWillMount() {
    const { onFetchRecords, match } = this.props;
    const { langId, topicId } = match.params;
    onFetchRecords(langId, topicId);
  }

  render() {
    const { records, fetchingRecords } = this.props;
    return (
      <Container text>
        <Loader active={fetchingRecords} />
        {records.map(record => <Message header={`Record #${record.id}`} />)}
      </Container>
    );
  }
}

Session.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Session);
