import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Sticky, Image, Flag, Button } from 'semantic-ui-react';

import avatarImg from '../assets/images/avatar.png';

const propTypes = {
  context: PropTypes.shape({}).isRequired,
  offset: PropTypes.number.isRequired,
  image: PropTypes.string,
  nationality: PropTypes.string,
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
  const { context, offset, image, username, name, tags, nationality} = props;
  const tagLabels = _.filter(tags).map(tag => <Label content={tag.text} color={tag.color} />);
  return (
    <Sticky className="p-2" context={context} offset={offset}>
      <Card>
        <Image className="p-2" src={image || avatarImg} />
        <Card.Content>
          <Card.Header><Flag name={nationality || 'us'}/>{name || username}</Card.Header>
          <Card.Meta>{username}</Card.Meta>
          <Card.Description>{!_.isEmpty(tagLabels) && tagLabels}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Learning Languages
            </Button>
            <Label basic color='orange' pointing='left'>
              2
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Highest Level Achieved
            </Button>
            <Label basic color='orange' pointing='left'>
              3
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Transcribed Words
            </Button>
            <Label basic color='orange' pointing='left'>
              12
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Finished Topics
            </Button>
            <Label basic color='orange' pointing='left'>
              3
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </Sticky>
  );
}

StickyProfileCard.propTypes = propTypes;
StickyProfileCard.defaultProps = defaultProps;

export default StickyProfileCard;
