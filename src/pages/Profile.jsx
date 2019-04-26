import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';

import ProficiencyCard from '../components/ProficiencyCard';
import StickyProfileCard from '../components/StickyProfileCard';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const propTypes = {
  user: PropTypes.shape({}).isRequired,
};

class Profile extends Component {
  state = {
    proficiency: [],
    submissions: {},
    topics: {}
  };

  async componentWillMount() {
    const { user } = this.props;
    const promises = user.proficiency.map(async ({ language: langId, level, percent }) => {
      const { data } = await axios.get(`core/languages/${langId}/`);
      return { ...data, level, percent };
    });
    const proficiency = await Promise.all(promises);
    this.setState({ proficiency });

    const submissionsPromises = user.proficiency.map(
      async ({language: langId}) => {
        const submissionData = await axios.get(`transcription/submissions/${langId}`);
        submissionData.langId = langId
        return {
          langId: langId,
          data: submissionData.data
        };
      }
    );
    const submissionList = await Promise.all(submissionsPromises);
    let submissions = {};
    submissionList.map((s) => {submissions[s.langId] = s.data});
    this.setState({submissions});
    
    const topicPromises = this.props.user.proficiency.map(
      async ({language: langId}) => {
        const { data } = await axios.get(`core/languages/${langId}/topics/`);
        return {langId, data};
      }
    );
    const topicList = await Promise.all(topicPromises);
    let topics = {};
    topicList.map(topic => {
      topics[topic.langId] = topic.data;
    });
    this.setState({ topics });
  }


  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { user } = this.props;
    const { proficiency, contextRef } = this.state;
    const offset = 20;
    const finishedTopics = Object.keys(this.state.topics)
      .reduce((r, k) => {
        return r + this.state.topics[k].reduce((r2, topic) => {
          if (topic.progress.total > 0 && topic.progress.current == topic.progress.total) {
            return r2 + 1;
          } else {
            return r2;
          }
        }, 0);
      }, 0);

    return (
      <Container>
        <Grid centered>
          <Grid.Column width={4}>
            <StickyProfileCard
              context={contextRef}
              offset={offset}
              image={user.profileThumbnail}
              username={user.username}
              name={user.name}
              nationality={user.nationality}
              email={user.email}
              joined={user.dateJoined}
              proficiency={proficiency}
              finishedTopics={finishedTopics}
              submissions={Object.keys(this.state.submissions).map((k) => {return this.state.submissions[k]})}
              tags={[
                user.isExpert && { text: 'Expert', color: 'green' },
              ]}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <div className="pt-2" ref={this.handleContextRef}>
              {proficiency.map(( lang ) => (
                <ProficiencyCard
                  key={lang.id.toString()}
                  lang={lang}
                  submissions={this.state.submissions[lang.id]}
                  topics={this.state.topics[lang.id]}
                />
              ))}
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Profile.propTypes = propTypes;

export default connect(mapStateToProps)(Profile);
