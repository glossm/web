import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Sticky } from 'semantic-ui-react';

import avatarImg from '../assets/images/avatar.png';

const propTypes = {
  context: PropTypes.shape({}).isRequired,
  offset: PropTypes.number.isRequired,
  image: PropTypes.string,
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })),
};

const defaultProps = {
  image: avatarImg,
  name: '',
  tags: [],
};

function StickyProfileCard(props) {
  const { context, offset, image, username, name, tags } = props;
  const tagLabels = _.filter(tags).map(tag => <Label content={tag.text} color={tag.color} />);
  return (
    <Sticky context={context} offset={offset}>
      <Card
        image={image || avatarImg}
        header={username}
        description={name}
        extra={!_.isEmpty(tagLabels) && tagLabels}
      />
    </Sticky>
  );
}

StickyProfileCard.propTypes = propTypes;
StickyProfileCard.defaultProps = defaultProps;

export default StickyProfileCard;
