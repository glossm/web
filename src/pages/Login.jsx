import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Header, Message } from 'semantic-ui-react';

import { login } from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(login(username, password)),
});

const propTypes = {
  onLogin: PropTypes.func.isRequired,
};

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = async () => {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    try {
      await onLogin(username, password);
    } catch (error) {
      this.setState({ error: true });
    }
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <Container text className="page">
        <Header size="large" className="top-header">Login</Header>
        <Form onSubmit={this.onSubmit} error={error}>
          <Form.Group widths="equal">
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
          </Form.Group>
          <Message
            error
            header="Wrong username or password"
            content="Please double-check your username and password."
          />
          <Form.Button content="Submit" />
        </Form>
      </Container>
    );
  }
}

Login.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Login);
