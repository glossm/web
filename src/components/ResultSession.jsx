import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Progress } from 'semantic-ui-react';

const propTypes = {
  answer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  topAnswers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string.isRequired,
    ratio: PropTypes.number.isRequired,
  })).isRequired,
  onNext: PropTypes.func.isRequired,
};

function ResultSession(props) {
  const { answer: submittedAnswer, score, topAnswers, onNext } = props;
  return (
    <React.Fragment>
      <Header content="Submission Result" />
      <Header content="Your Answer" size="tiny" />
      <p>{submittedAnswer}</p>
      <Header content="Score" size="tiny" />
      <p>{score} points</p>
      <Header content="Top Answers" size="tiny" />
      {topAnswers.map(({ answer, ratio }) => (
        <Fragment>
          <p>{answer}</p>
          <Progress
            progress
            percent={Math.round(ratio * 100)}
            success={answer === submittedAnswer}
          />
        </Fragment>
      ))}
      <Button content="Next" onClick={onNext} color="green" />
    </React.Fragment>
  );
}

ResultSession.propTypes = propTypes;

export default ResultSession;
