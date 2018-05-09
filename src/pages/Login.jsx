import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Header } from 'semantic-ui-react';

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
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    onLogin(username, password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <Container text className="page">
        <Header size="large">Login</Header>
        <Form onSubmit={this.onSubmit}>
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
          <Form.Button content="Submit" />
        </Form>
      </Container>
    );
  }
}

Login.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Login);
