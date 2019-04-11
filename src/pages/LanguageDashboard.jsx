import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class LanguageDashboard extends Component {
  

  render() {
    return (
      <Container>
        <div>LanguageDashboard placeholder</div>
        <div>Language id: {this.props.match.params.langId} </div>
        <div>todo: add an action that fetches language information from langID </div>
      </Container>
    );
  }
}

export default LanguageDashboard;
