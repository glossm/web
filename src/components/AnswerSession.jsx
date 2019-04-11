import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Icon, Image, Label } from 'semantic-ui-react';
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
    activeMeanLang: 'en',
    showIPATable: false
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
        <SpectrogramCanvas audio={audio} onLoad={this.onLoad} ref={this.spectrogram}></SpectrogramCanvas>

        <div className="ui equal width grid">
          <div className="column">
            <Button.Group className="AnswerSession-flagButtonGroup">
              {LANGUAGES.map(({code, name}, i) =>
              (i < LANGUAGES.length - 1) ?
                <Button
                  className="AnswerSession-flagButton"
                  active={this.state.activeMeanLang === code} 
                  key={code} 
                  onClick={() => {this.setState({activeMeanLang: code})}}>
                  <Image src={`/flags/${code}16.png`}/>
                </Button>
              :
                <Button as="div" labelPosition="right">
                  <Button 
                    className="AnswerSession-flagButton"
                    size="mini" 
                    active={this.state.activeMeanLang === code} 
                    onClick={() => {this.setState({activeMeanLang: code})}}>
                    <Image src={`/flags/${code}16.png`}/>
                  </Button>
                  <Label basic pointing='left'>{meaning[this.state.activeMeanLang]}</Label>
                </Button>
              )}
            </Button.Group >
          </div>
          
        </div>

        <div className="ui equal width grid">
          <div className="four wide column">
            <Button basic icon labelPosition="right">
              <Icon 
                name={this.state.showIPATable?"chevron up":"chevron down"} 
                onClick={() => this.setState({showIPATable: !this.state.showIPATable})}/>
              IPA Table
            </Button>
          </div>

          <div className="twelve wide column">
            <Form onSubmit={this.onSubmit} >
              <Form.Group className="AnswerSession-formGroup">
                <IPAInput className="IPAInput" ref={this.ipaInput} name="answer" value={answer} onChange={this.onChange}/>
                <Form.Button content="Submit" color="green" />
              </Form.Group>
            </Form>
          </div>
          <PhoneticTable hidden={!this.state.showIPATable} onClick={this.onPhonemeTableClick}></PhoneticTable>

        </div>
      </Fragment>
    );
  }
}

AnswerSession.propTypes = propTypes;
AnswerSession.defaultProps = defaultProps;

export default AnswerSession;
