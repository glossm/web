import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Header } from 'semantic-ui-react';

const propTypes = {
  onGoBack: PropTypes.func.isRequired,
};

function CompletedSession(props) {
  const { onGoBack } = props;
  return (
    <Fragment>
      <Header content="You've learned every word in this topic!" />
      <Button content="Back to Topics" onClick={onGoBack} />
    </Fragment>
  );
}

CompletedSession.propTypes = propTypes;

export default CompletedSession;
