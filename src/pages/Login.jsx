import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Message, Modal, Grid, Divider } from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login';

import { login } from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(login(username, password)),
});

const propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
  };

  onClose = () => this.props.history.goBack();
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = async () => {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    try {
      await onLogin(username, password);
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onFacebookLoggedIn = (response) => {
    console.log(response);
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <Modal defaultOpen size="mini" onClose={this.onClose}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Grid columns={2}>
            <Divider vertical></Divider>
            <Grid.Row>
              <Grid.Column>

                <Form id="login-form" onSubmit={this.onSubmit} error={error}>
                  <Form.Input
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChange}
                  />
                  <Form.Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChange}
                  />
                  <Message
                    error
                    header="Wrong username or password"
                    content="Please double-check your username and password."
                  />
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <FacebookLogin
                  appId="568297597025149"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={this.onFacebookLoggedIn}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button
                  type="submit"
                  form="login-form"
                  content="Login"
                  color="green"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

Login.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Login);
