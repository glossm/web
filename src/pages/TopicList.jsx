import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Header, Progress } from 'semantic-ui-react';
import axios from 'axios';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

class TopicList extends Component {
  state = {
    topics: {},
  };

  async componentWillMount() {
    const { match } = this.props;
    const { langId } = match.params;
    const { data: topics } = await axios.get(`core/languages/${langId}/topics/`);
    this.setState({ topics });
    
  }

  onGoBack = () => this.props.history.push('/learn/');

  renderTopicCard = langId => (topic) => {
    
    const { id: topicId, name, progress } = topic;
    const { current, total } = progress;
    
    const progressBar = (
      <Progress
        value={current}
        total={total}
        size="small"
        style={{ marginBottom: 0 }}
        success={current !== 0 && current === total}
      />
    );
    return (
      <Card
        key={topicId.toString()}
        as={Link}
        to={`/learn/${langId}/${topicId}/`}
        header={name}
        description={`${current} / ${total} learned`}
        extra={progressBar}
       
      />
    );
  }

  render() {
    const { match } = this.props;
    const { topics } = this.state;
    const { langId } = match.params;
    const topicsByLevel = _.groupBy(topics, 'level');
    const sortedLevels = _.sortBy(_.keys(topicsByLevel), _.toNumber);

    return (
      <Container>
        <Header content="Select a Topic" size="large" className="top-header" />
        {sortedLevels.map(level => (
          <div key={level} style={{ marginBottom: '2rem' }}>
            <Header content={`Level ${level}`} />
            <Card.Group stackable itemsPerRow={4}>
              {topicsByLevel[level].map(this.renderTopicCard(langId))}
            </Card.Group>
          </div>
        ))}
        <Header size="tiny" />
        <Button content="Back to Languages" onClick={this.onGoBack} />
      </Container>
    );
  }
}

TopicList.propTypes = propTypes;

export default TopicList;
// 