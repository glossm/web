import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Header } from 'semantic-ui-react';
import axios from 'axios';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
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

  onGoBack = () => this.props.history.push('/learn/');

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
              key={topic.id.toString()}
              as={Link}
              to={`/learn/${langId}/${topic.id}/`}
              header={topic.name}
              meta={`Level ${topic.level}`}
            />
          ))}
        </Card.Group>
        <Header size="tiny" />
        <Button content="Back to Languages" onClick={this.onGoBack} />
      </Container>
    );
  }
}

TopicList.propTypes = propTypes;

export default TopicList;
