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
  };

  async componentWillMount() {
    const { user } = this.props;
    const promises = user.proficiency.map(async ({ language: langId, level, percent }) => {
      const { data } = await axios.get(`core/languages/${langId}/`);
      return { ...data, level, percent };
    });
    const proficiency = await Promise.all(promises);
    this.setState({ proficiency });
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { user } = this.props;
    const { proficiency, contextRef } = this.state;
    const offset = 20;

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
