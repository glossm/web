
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TempWaveform from './TempWaveform';

const propTypes = {
  waveform: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

const defaultProps = {
  waveform: null,
  width: 200,
  height: 40
};


class WaveformCanvas extends Component {
  constructor(props) {
    super(props);
    this.waveform = TempWaveform;
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const context = this.refs.canvas.getContext('2d');
    let data = [];
    const nBins = Math.floor(this.props.width / 3);
    for (let i =0; i < nBins; i++) {
      data.push(0);
    }
    console.log(nBins);
    const hop = this.waveform.length / nBins;
    for (let i = 0; i < this.waveform.length; i++) {
      data[Math.floor(i / hop)] += this.waveform[i];
    }
    const max = 1.1 * data.reduce((a, b) => {return a > b ? a : b});
    context.lineWidth = 1 ;
    const halfHeight = this.props.height / 2;
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, this.props.width, this.props.height);
    for (let i = 0; i < nBins; i++) {
      context.moveTo(1.5 + i * 3, halfHeight - halfHeight * data[i] / max);
      context.lineTo(1.5 + i * 3, halfHeight + halfHeight * data[i] / max);
    }
    context.stroke();
  }

  render() {
    return (
      <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
    );
  }
}

WaveformCanvas.propTypes = propTypes;
WaveformCanvas.defaultProps = defaultProps;

export default WaveformCanvas;
