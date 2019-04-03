
import React, { Component } from 'react';
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
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      height: 80,
      width: 200,
      maxCanvasWidth: 200,
      minPxPerSec: 1,
      container: "#waveform",
      plugins: [
        SpectrogramPlugin.create({
          height: 80,
          maxCanvasWidth: 200,
          fftSamples: 256,
          container: "#spectrum",
        })
    ]
    });
    this.wavesurfer.load('/example.mp3');
    this.wavesurfer.on('ready', () =>{
      this.props.onLoad(1);
    });
  }

  playOrPause() {
    this.wavesurfer.playPause();
  }

  render() {
    return (
      <div>
        <div id="waveform"></div>
        <div id="spectrum"></div>
      </div>
      //<canvas ref="canvas" width={this.props.width} height={this.props.height}/>
    );
  }
}

SpectrogramCanvas.propTypes = propTypes;
SpectrogramCanvas.defaultProps = defaultProps;

export default SpectrogramCanvas;
