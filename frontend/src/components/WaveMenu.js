import React, { Component } from 'react';
import Slider from './Slider.js';
import Controller from './Controller.js';
import Key from './Key.js';
import { initOsc, initGain, valueToFraction } from '../module/helper.js';
import { noteToFreq, generateNoteArr, coorToPercent, flipPercent } from '../util/helper.js';

class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      gain: 100,
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
    // first octave
    this.osc = initOsc(context, type, freq)
    this.gain = initGain(context, this.osc)
    // double octave
    this.osc2 = initOsc(context, type, freq / 2)
    this.gain2 = initGain(context, this.osc2)
    this.setState({
      context
    })
  }
  toggleOnOff = (e) => {
    let { on, start, context, interval } = this.state;
    if (e.key === "o" || e.target.id === "on-off") {
      if (interval) { clearInterval(interval) }
      if (!start) {
        this.osc.start();
        this.osc2.start();
      };
      if (!on) {
        this.gain.connect(context.destination);
        this.gain2.connect(context.destination);
        this.setState({
          on: true,
          start: true
        })
      } else {
        this.gain.disconnect(context.destination);
        this.gain2.disconnect(context.destination);
        this.setState({
          on: false
        })
      }
    }
  }

  toggleType = (e) => {
    this.osc.type = e.target.id;
    this.osc2.type = e.target.id;
    this.setState({
      type: e.target.id
    })
  }

  clearClip = () => {
    if (this.state.interval) { clearInterval(this.state.interval) }
  }

  handleFrequency = (e, w, y) => {
    let hertz, hertz2;
    if (!e) {
      let high_hz = noteToFreq('C5');
      hertz = (flipPercent(coorToPercent(y, w)) * high_hz / 100).toFixed(3);
    } else {
      hertz = e.target.value;
    }
    hertz2 = hertz / 2;
    this.osc.frequency.value = hertz;
    this.osc2.frequency.value = hertz2;
    this.setState({
      freq: hertz
    })
  }

  handleGain = (e) => {
    let fraction = valueToFraction(e.target.value)
    this.gain.gain.value = fraction;
    this.gain2.gain.value = fraction;
    this.setState({
      gain: e.target.value
    })
  }

  handleClip = (e, w, x) => {
    // let { interval } = this.state;
    let milisecs = e ? e.target.value * 2 : (coorToPercent(x, w) * 2);
    if (this.state.interval) { clearInterval(this.state.interval) }
    let gain_val = valueToFraction(this.state.gain);
    const connect = () => {
      this.gain.gain.value = gain_val;
      this.gain2.gain.value = gain_val;
    }
    const clip = () => {
      this.gain.gain.value = 0;
      this.gain2.gain.value = 0;
      setTimeout(connect, milisecs)
    }
    let startInterval = setInterval(clip, milisecs * 2)
    this.setState({
      interval: startInterval,
      clip_rate: milisecs / 2
    })
  }

  render() {
    let { on, freq, gain, clip_rate } = this.state;
    return (
      <>
      <div className="controller-wrapper">
        <Controller handleChangeY={this.handleFrequency}
                    handleChangeX={this.handleClip}/>
        
        <div className="freq-slider">
          <Slider
              handleChange={this.handleFrequency}
              value={freq}
              min={noteToFreq('C3')}
              max={noteToFreq('C5')}
              step="0.001"
            />
            <p>{freq}Hz</p>
        </div>
        <div className="clip-slider">
          Clipper
          <Slider
            handleChange={this.handleClip}
            value={clip_rate}
            min="5"
            max="105"
            step="10"
          />
          <button
            id="on-off"
            onClick={this.clearClip}
          >clear</button>
        </div>
      </div>
      <div className="slide-wrapper">
        Gain {gain}
        <Slider
          handleChange={this.handleGain}
          value={gain}
          min="0"
          max="100"
        />
      </div>
      <div className="wavetype-buttons-wrapper">
        <button onClick={this.toggleType} id="sine">sine</button>
        <button onClick={this.toggleType} id="sawtooth">saw</button>
        <button onClick={this.toggleType} id="triangle">triangle</button>
        <button
          id="on-off"
          onKeyDown={this.toggleOnOff}
          onClick={this.toggleOnOff}
        >{on ? "on" : "off"}</button>
      </div>
      <div className="test-wrapper" style={{display: 'flex'}}>
        {generateNoteArr('C3','C5').map((note, i) => {
          return <Key note={note} key={i} freqState={this.state.freq} />
        })}
      </div>
      </>
    )
  }
}

export default WaveMenu;
