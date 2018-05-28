import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, Grid, Label, Sticky } from 'semantic-ui-react';
import axios from 'axios';

import avatarImg from '../assets/images/avatar.png';
import ProficiencyCard from '../components/ProficiencyCard';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const propTypes = {
  user: PropTypes.shape({}).isRequired,
};

class Profile extends Component {
  state = {
    sticked: false,
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

  onStick = () => this.setState({ sticked: true });
  onUnstick = () => this.setState({ sticked: false });
  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { user } = this.props;
    const { sticked, proficiency, contextRef } = this.state;
    return (
      <Container>
        <Grid centered>
          <Grid.Column width={4}>
            <Sticky context={contextRef} offset={100}>
              <Card
                style={{ marginTop: sticked ? 100 : 0 }}
                image={user.profileThumbnail || avatarImg}
                header={user.username}
                description={user.name}
                extra={user.isExpert && <Label content="Expert" color="green" />}
              />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>
            <div ref={this.handleContextRef}>
              {proficiency.map(({ id, name, level, percent }) => (
                <ProficiencyCard
                  key={id.toString()}
                  name={name}
                  level={level}
                  percent={percent}
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
