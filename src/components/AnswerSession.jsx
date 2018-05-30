import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Table } from 'semantic-ui-react';
import Sound from 'react-sound';

const propTypes = {
  audio: PropTypes.string,
  meaning: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  audio: null,
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'mn', name: 'Mongolian' },
];

class AnswerSession extends Component {
  state = {
    answer: '',
    playing: false,
    playingDisabled: true,
    loadFailed: false,
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { answer } = this.state;
    onSubmit(answer);
  };
  onLoad = ({ loaded }) => {
    if (loaded) {
      this.setState({ playingDisabled: false });
    } else {
      this.setState({ loadFailed: true });
    }
  };
  onPlay = () => this.setState({ playing: true });
  onFinishedPlaying = () => this.setState({ playing: false });

  render() {
    const { audio, meaning } = this.props;
    const { answer, playing, playingDisabled, loadFailed } = this.state;
    const { PLAYING, STOPPED } = Sound.status;

    let playButtonText = 'Play';
    if (!audio) playButtonText = 'No audio source';
    if (loadFailed) playButtonText = 'Invalid audio source';

    return (
      <Fragment>
        <Header content="What does this sound like?" />
        {audio && (
          <Sound
            autoLoad
            url={audio}
            playStatus={playing ? PLAYING : STOPPED}
            onLoad={this.onLoad}
            onFinishedPlaying={this.onFinishedPlaying}
          />
        )}
        <Button
          content={playButtonText}
          icon="play"
          onClick={this.onPlay}
          disabled={playingDisabled}
        />
        <Table basic="very" style={{ marginTop: '2rem' }}>
          <Table.Header>
            <Table.Row>
              {LANGUAGES.map(({ code, name }) => <Table.HeaderCell key={code} content={name} />)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {LANGUAGES.map(({ code }) => <Table.Cell key={code} content={meaning[code]} />)}
            </Table.Row>
          </Table.Body>
        </Table>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="answer"
            placeholder="Your Answer"
            value={answer}
            onChange={this.onChange}
          />
          <Form.Button content="Submit" color="green" />
        </Form>
      </Fragment>
    );
  }
}

AnswerSession.propTypes = propTypes;
AnswerSession.defaultProps = defaultProps;

export default AnswerSession;
