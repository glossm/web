import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

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

  render() {
    const { username, password, error } = this.state;
    return (
      <Modal defaultOpen size="mini" onClose={this.onClose}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
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
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            form="login-form"
            content="Login"
            color="green"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

Login.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Login);
