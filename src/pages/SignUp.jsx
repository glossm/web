import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

import { signUp } from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password1, password2) =>
    dispatch(signUp(username, email, password1, password2)),
});

const propTypes = {
  onSignUp: PropTypes.func.isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: false,
  };

  onClose = () => this.props.history.goBack();
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = async () => {
    const { onSignUp } = this.props;
    const { username, email, password1, password2 } = this.state;
    try {
      await onSignUp(username, email, password1, password2);
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { username, email, password1, password2, error } = this.state;
    return (
      <Modal defaultOpen size="small" onClose={this.onClose}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <Form id="signup-form" onSubmit={this.onSubmit} error={error}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Username</label>
                <Form.Input
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email Address</label>
                <Form.Input
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Password</label>
                <Form.Input
                  name="password1"
                  type="password"
                  placeholder="Longer than 8 characters"
                  value={password1}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <Form.Input
                  name="password2"
                  type="password"
                  placeholder="Type it again"
                  value={password2}
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form.Group>
            <Message
              error
              header="Wrong account information"
              content="Please double-check the information you gave."
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            form="signup-form"
            content="Sign Up"
            color="green"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

SignUp.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(SignUp);
