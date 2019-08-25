import React, { Component } from 'react';
import { Slider } from './Slider.js';
class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      on: false,
      start: false,
      osc: "",
      ctx: ""
    }
  }

  componentDidMount() {
    let { type, freq } = this.state;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator();

    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(audioCtx.destination);

    this.setState({ ctx: audioCtx,
                    osc: osc })
  }
  toggleOnOff = (e) => {
    let { osc, ctx, on, start } = this.state;
    if (!start) {
      osc.start();
    };
    if (!on) {
      ctx.resume();
      this.setState({
        on: true,
        start: true
      })
    } else {
      ctx.suspend();
      this.setState({
        on: false
      })
    }
  }

  toggleType = (e) => {
    this.state.osc.type = e.target.id;
    this.setState({
      type: e.target.id
    })
  }

  render() {
    let { on } = this.state;
    return (
      <>
      <div className="controller-wrapper">
        <button onClick={this.toggleOnOff}>{on ? "off" : "on"}</button>
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
