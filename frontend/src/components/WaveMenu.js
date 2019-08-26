import React, { Component } from 'react';
import Slider from './Slider.js';
class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      gain: 0.5,
      on: false,
      start: false,
      context: ""
    }
  }

  componentDidMount() {
    let { type, freq } = this.state;
    let context = new (window.AudioContext || window.webkitAudioContext)()
    this.osc = context.createOscillator();
    this.gain = context.createGain();
    this.osc.type = type;
    this.osc.frequency.value = freq;
    this.osc.connect(this.gain);
    this.gain.connect(context.destination);
    this.setState({
      context
    })
  }
  toggleOnOff = (e) => {
    let { on, start, context } = this.state;
    if (!start) {
      this.osc.start();
    };
    if (!on) {
      this.gain.connect(context.destination);
      this.setState({
        on: true,
        start: true
      })
    } else {
      this.gain.disconnect(context.destination);
      this.setState({
        on: false
      })
    }
  }

  toggleType = (e) => {
    this.osc.type = e.target.id;
    this.setState({
      type: e.target.id
    })
  }

  handleFrequency = (e) => {
    this.osc.frequency.value = e.target.value;
    this.setState({
      freq: e.target.value
    })
  }

  handleGain = (e) => {
    console.log(parseFloat(e.target.value/600).toFixed(2));

    this.gain.gain.value = parseInt(e.target.value/600);
    this.setState({
      gain: e.target.value
    })
  }

  render() {
    let { on, freq, gain } = this.state;

    return (
      <>
      <div className="controller-wrapper">
        <button onClick={this.toggleOnOff}>{on ? "on" : "off"}</button>
      </div>
      <div className="slide-wrapper">
        <Slider handleChange={this.handleFrequency} value={freq}/>
        <Slider handleChange={this.handleGain} value={gain}/>
      </div>
      <div className="wavetype-buttons-wrapper">
        <button onClick={this.toggleType} id="sine">sine</button>
        <button onClick={this.toggleType} id="sawtooth">saw</button>
        <button onClick={this.toggleType} id="triangle">triangle</button>
      </div>
      </>
    )
  }
}

export default WaveMenu;
