import React, { Component } from 'react';
import Slider from './Slider.js';
class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      gain: 0.5,
      clip_rate: 500,
      on: false,
      start: false,
      context: "",
      interval: ""
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
    let { on, start, context, interval } = this.state;
    if (interval) { clearInterval(interval) }
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
    let fraction = parseInt(e.target.value) / 100;
    // use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    this.gain.gain.value = fraction * fraction;
    this.setState({
      gain: e.target.value
    })
  }

  handleClip = (e) => {
    let { context, interval } = this.state;
    let newRate = e.target.value * 2;

    if (interval) { clearInterval(interval) }
    const connect = () => {
      this.gain.connect(context.destination)
    }
    const clip = () => {
      this.gain.disconnect(context.destination);
      setTimeout(connect, newRate)
    }

    let startInterval = setInterval(clip, newRate * 2)
    this.setState({
      interval: startInterval,
      clip_rate: newRate / 2
    })

  }

  render() {
    let { on, freq, gain, clip_rate } = this.state;

    return (
      <>
      <div className="controller-wrapper">
        <button onClick={this.toggleOnOff}>{on ? "on" : "off"}</button>
      </div>
      <div className="slide-wrapper">
        Frequency {freq}
        <Slider
          handleChange={this.handleFrequency}
          value={freq}
          min="220"
          max="600"
        />
        Gain {gain}
        <Slider
          handleChange={this.handleGain}
          value={gain}
          min="0"
          max="100"
        />
        Clipper
        <Slider
          handleChange={this.handleClip}
          value={clip_rate}
          min="1"
          max="100"
        />
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
