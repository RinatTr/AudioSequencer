import React, { Component } from 'react';

class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      freq: 440,
      on: false,
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
    osc.start()
    this.setState({ ctx: audioCtx,
                    osc: osc })
  }
  toggleOnOff = (e) => {
    let { osc, ctx, on } = this.state;
    if (!on) {
      osc.connect(ctx.destination)
      this.setState({
        on: true
      })
    } else {
      osc.disconnect(ctx.destination)
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
