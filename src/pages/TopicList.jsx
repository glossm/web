import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Header, Progress, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { noAuto } from '@fortawesome/fontawesome-svg-core';

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

  // unnecessary recursion
  levelEnabled = (level) => {
    const topicsByLevel = _.groupBy(this.state.topics, 'level');
    const enabled =  (level == 1) ? true :
      topicsByLevel[level-1].reduce((a, b) => {
        return a && ( b.progress.current == b.progress.total );
      }, this.levelEnabled(level-1));
    return enabled;
  }

  renderTopicCard = langId => (topic) => {
    const { id: topicId, name, progress, level } = topic;
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
    const enabled = this.levelEnabled(level);
    return (
      <Card
        style={{minWidth: '160px', backgroundColor: enabled?'white':'#cccccc'}}
        key={topicId.toString()}
        as={enabled?Link:'div'}
        to={`/learn/${langId}/${topicId}/`}
        header={name}
        description={`${current} / ${total} learned`}
        image={topic.image || '/topic_placeholder.png'}
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
        <Segment style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace:'nowrap'}}>
        {sortedLevels.map(level => (
          <span key={level} style={{ marginBottom: '2rem', display: 'inline-block'}}>
            <Header content={`Level ${level}`} />
            <Card.Group stackable itemsPerRow={1}>
              {topicsByLevel[level].map(this.renderTopicCard(langId))}
            </Card.Group>
          </span>
        ))}
        </Segment>
        <Header size="tiny" />
        <Button content="Back to Languages" onClick={this.onGoBack} />
      </Container>
    );
  }
}

TopicList.propTypes = propTypes;

export default TopicList;
