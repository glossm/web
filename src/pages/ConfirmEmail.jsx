import React, { Component } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${axios.defaults.baseURL}/user/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

async function testRequest(token) {
  const response = await fetch(`${axios.defaults.baseURL}/auth/confirm-email/${token}/`, {
    method: 'POST',
    headers: {'X-CSRFToken': await getCsrfToken()},
    credentials: 'include',
  });
  await response.json();
}

class ConfirmEmail extends Component {
  confirm = () => {
    testRequest(this.props.match.params.token).then(
      () => {
        window.location.href = '/profile/';
      }
    );
  }

  render() {
    return (
      <Container>
        <Header> Confirm your email.</Header>
        <Button onClick={this.confirm}>Confirm</Button>
      </Container>
    );
  }
}

export default ConfirmEmail;
