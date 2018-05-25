import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import humanFormat from 'human-format';

class LanguageList extends Component {
  state = {
    languages: [],
  };

  async componentWillMount() {
    const response = await axios.get('core/languages/');
    const languages = response.data;
    this.setState({ languages });
  }

  render() {
    const { languages } = this.state;
    return (
      <Container>
        <Header content="Select a Language" size="large" className="top-header" />
        <Card.Group stackable itemsPerRow={4}>
          {languages.map(lang => (
            <Card
              key={`lang-${lang.id}`}
              as={Link}
              to={`/learn/${lang.id}/`}
              header={lang.name}
              meta={`${humanFormat(lang.numSpeakers)} speakers`}
              description={lang.description}
            />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default LanguageList;
