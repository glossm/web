
import React, { Component } from 'react';
import { Button, Fragment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram';

const propTypes = {
  audio: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

const defaultProps = {
  audio: null,
  width: 200,
  height: 40
};


class SpectrogramCanvas extends Component {
  constructor(props) {
    super(props);
    this.playOrPause = this.playOrPause.bind(this);
    this.showSpectrogram = this.showSpectrogram.bind(this);
    this.state = {
      loaded: false,
      playing: false,
      showSpectrogram: false,
    }
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      height: 60,
      maxCanvasWidth: 200,
      minPxPerSec: 1,
      container: "#waveform",
      waveColor: "#4d4d4d",
      cursorWidth: 2,
      progressColor: "#d55e2d",
      normalize: true,
      plugins: [
        SpectrogramPlugin.create({
          maxCanvasWidth: 200,
          fftSamples: 512,
          container: "#spectrum",
        })
    ]
    });
    this.wavesurfer.load(this.props.audio || '/example.mp3');
    this.wavesurfer.on('ready', () =>{
      this.setState({loaded: true});
    });
    this.wavesurfer.on('finish', () => {
      this.setState({playing: false});
    })
  }

  playOrPause() {
    if (this.state.playing) {
      this.wavesurfer.pause();
      this.setState({playing: false});
    } else {
      this.wavesurfer.play();
    this.setState({playing: true});
    }
  }

  showSpectrogram() {
    this.setState({showSpectrogram: !this.state.showSpectrogram});
  }

  render() {
    return (
      <div className="ui grid">
        <div className="ui two wide column">
          <Button basic
            className="AudioPlayer-playButton"
            loading={!this.state.loaded}
            icon={this.state.playing?"pause":"play"}
            onClick={this.playOrPause}
            disabled={!this.state.loaded}
          />
        </div>
        <div className="ui twelve wide column AudioPlayer-waveformDiv">
          <div className="AudioPlayer-waveform" id="waveform"></div>
          <div hidden={!this.state.showSpectrogram} id="spectrum"></div>
        </div>
        <div className="ui two wide column">
          <Button basic
            className="AudioPlayer-spectrumButton"
            icon={this.state.showSpectrogram?"chevron up":"chevron down"}
            onClick={this.showSpectrogram}
          />
        </div>
      </div>
    );
  }
}

SpectrogramCanvas.propTypes = propTypes;
SpectrogramCanvas.defaultProps = defaultProps;

export default SpectrogramCanvas;
