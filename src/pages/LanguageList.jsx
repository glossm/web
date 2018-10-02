import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import humanFormat from 'human-format';

class LanguageList extends Component {
  state = {
    languages: [],
  };

  componentWillMount() {
    this.fetchLanguages();
  }

  onStartLearning = async (langId) => {
    await axios.post('transcription/start-learning/', { language: langId });
    this.fetchLanguages();
    
  }

  async fetchLanguages() {
    const response = await axios.get('core/languages/');
    const languages = response.data;
    this.setState({ languages });
  }

  renderLanguageCard = (language) => {
    const { id, name, numSpeakers, learning } = language;
    const commonProps = {
      key: id.toString(),
      header: name,
      description: `${humanFormat(numSpeakers)} speakers`,
    };
    const startLearningButton = () => (
      <Button
        fluid
        content="Start Learning"
        onClick={() => this.onStartLearning(id)}
      />
    );
    return learning ?
      <Card {...commonProps} as={Link} to={`/about/${id}/`} /> :
      <Card {...commonProps} extra={startLearningButton()} />;
  };

  render() {
    const { languages } = this.state;
    return (
      <Container>
        <Header content="Select a Language" size="large" className="top-header" />
        <Header content="Languages You're Learning" />
        <Card.Group stackable itemsPerRow={4}>
          {languages.filter(lang => lang.learning).map(this.renderLanguageCard)}
        </Card.Group>
        <Header content="Languages You're Not Yet Learning" />
        <Card.Group stackable itemsPerRow={4}>
          {languages.filter(lang => !lang.learning).map(this.renderLanguageCard)}
        </Card.Group>
      </Container>
    );
  }
}

export default LanguageList;
