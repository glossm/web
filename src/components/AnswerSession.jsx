import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Table } from 'semantic-ui-react';
import Sound from 'react-sound';
import IPAInput from './IPAInput';
import WaveformCanvas from './WaveformCanvas';
import PhoneticTable from './PhoneticTable';
import SpectrogramCanvas from './SpectrogramCanvas';

const propTypes = {
  audio: PropTypes.string,
  waveform: PropTypes.string,
  meaning: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  audio: null,
  waveform: null,
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

  constructor(props) {
    super(props);
    this.ipaInput = React.createRef();
    this.spectrogram = React.createRef();
  }

  onPhonemeTableClick = (ch) => {
    this.ipaInput.current.insert(ch);
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { answer } = this.state;
    onSubmit(this.ipaInput.current.state.value);
  };
  onLoad = (loaded) => {
    if (loaded) {
      this.setState({ playingDisabled: false });
    } else {
      this.setState({ loadFailed: true });
    }
  };
  onPlay = () => this.spectrogram.current.playOrPause();// this.setState({ playing: true });
  onFinishedPlaying = () => this.setState({ playing: false });

  render() {
    const { audio, meaning, waveform } = this.props;
    const { answer, playing, playingDisabled, loadFailed } = this.state;
    const { PLAYING, STOPPED } = Sound.status;

    let playButtonText = 'Play';
    if (!audio) playButtonText = 'No audio source';
    if (loadFailed) playButtonText = 'Invalid audio source';

    return (
      <Fragment>
        <Header content="What does this sound like?" />
        <Button
          content={playButtonText}
          icon="play"
          onClick={this.onPlay}
          disabled={playingDisabled}
        />
        <br/>
        <SpectrogramCanvas audio={audio} onLoad={this.onLoad} ref={this.spectrogram}></SpectrogramCanvas>
        <div style={{display: "flex"}}>
        {LANGUAGES.map(({code, name}) => 
          <div className="meaning-card" key={code}>
            <div className="meaning-card-header">{name}</div>
            <div className="meaning-card-body">{meaning[code]}</div>
          </div>
        )}
        </div>
        
        <Form onSubmit={this.onSubmit}>
          <IPAInput ref={this.ipaInput} name="answer" value={answer} onChange={this.onChange}/><br/>
          <Form.Button content="Submit" color="green" />
        </Form>
        <PhoneticTable onClick={this.onPhonemeTableClick}></PhoneticTable>
      </Fragment>
    );
  }
}

AnswerSession.propTypes = propTypes;
AnswerSession.defaultProps = defaultProps;

export default AnswerSession;
