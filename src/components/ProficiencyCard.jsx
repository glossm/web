import React from 'react';
import PropTypes from 'prop-types';
import { Header, Progress, Segment } from 'semantic-ui-react';

const propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

function ProficiencyCard(props) {
  const { name, level, percent } = props;
  return (
    <Segment padded>
      <Header size="medium">{name}</Header>
      <Header size="small">{`Level ${level}`}</Header>
      <Progress percent={percent} progress style={{ marginBottom: 0 }} />
    </Segment>
  );
}

ProficiencyCard.propTypes = propTypes;

export default ProficiencyCard;
