import React, { Component } from 'react';
import Slider from './Slider.js';
class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      on: false,
      start: false,
      context: ""
    }
  }

  componentDidMount() {
    let { type, freq } = this.state;
    let context = new (window.AudioContext || window.webkitAudioContext)()
    this.osc = context.createOscillator();
    this.osc.type = type;
    this.osc.frequency.value = freq;
    this.osc.connect(context.destination);
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
      this.osc.connect(context.destination);
      this.setState({
        on: true,
        start: true
      })
    } else {
      this.osc.disconnect(context.destination);
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
      freq: e.target.value,
    })
  }

  render() {
    let { on, freq } = this.state;
    return (
      <>
      <div className="controller-wrapper">
        <button onClick={this.toggleOnOff}>{on ? "on" : "off"}</button>
      </div>
      <div className="slide-wrapper">
        <Slider handleChange={this.handleFrequency} value={freq}/>
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
