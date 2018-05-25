import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Container, Header } from 'semantic-ui-react';
import axios from 'axios';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
};

class TopicList extends Component {
  state = {
    topics: [],
  };

  async componentWillMount() {
    const { match } = this.props;
    const { langId } = match.params;
    const response = await axios.get(`core/languages/${langId}/topics/`);
    const topics = response.data;
    this.setState({ topics });
  }

  render() {
    const { match } = this.props;
    const { topics } = this.state;
    const { langId } = match.params;
    return (
      <Container>
        <Header content="Select a Topic" size="large" className="top-header" />
        <Card.Group stackable itemsPerRow={4}>
          {topics.map(topic => (
            <Card
              key={`topic-${topic.id}`}
              as={Link}
              to={`/learn/${langId}/${topic.id}/`}
              header={topic.name}
              meta={`Level ${topic.level}`}
            />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

TopicList.propTypes = propTypes;

export default TopicList;
