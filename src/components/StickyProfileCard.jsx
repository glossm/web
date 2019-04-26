import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Sticky, Image, Flag, Button } from 'semantic-ui-react';
import { Translation } from 'react-i18next';

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
  const { context, offset, image, username, name, tags, nationality, proficiency, submissions, email, joined} = props;
  const tagLabels = _.filter(tags).map(tag => <Label content={tag.text} color={tag.color} />);

  const dateJoined = new Date(joined);
  const joinDate = {
    year: dateJoined.getFullYear(),
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dateJoined.getMonth()],
    day: dateJoined.getDay()
  };
  return (
    <Sticky className="p-2" context={context} offset={offset}>
      <Card>
        <Image className="p-2" src={image || avatarImg} />
        <Card.Content>
          <Card.Header><Flag name={nationality && nationality.toLowerCase() || 'us'}/>{name || username}</Card.Header>
          <Card.Meta>
            {username} <br/>
            {email} <br/>
            <Translation>
              {
                t => t('profile.joined', { joinDate } )
              }
            </Translation>
          </Card.Meta>
          <Card.Description>{!_.isEmpty(tagLabels) && tagLabels}</Card.Description>
          <Button basic size="tiny" as="a" href="/profile/edit">Edit Profile</Button>
        </Card.Content>
        <Card.Content extra>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Learning Languages
            </Button>
            <Label basic color='orange' pointing='left'>
              {proficiency.length}
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Highest Level Achieved
            </Button>
            <Label basic color='orange' pointing='left'>
              {proficiency.reduce((a, b) => {return Math.max(a, b.level)}, 0)}
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Transcribed Words
            </Button>
            <Label basic color='orange' pointing='left'>
              {submissions?submissions.reduce((a, b) => {return a + b.length}, 0):0}
            </Label>
          </Button>
          <Button size="large" className="mb-2" as='div' labelPosition='right'>
            <Button color='orange'>
              Finished Topics
            </Button>
            <Label basic color='orange' pointing='left'>
              {props.finishedTopics}
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
