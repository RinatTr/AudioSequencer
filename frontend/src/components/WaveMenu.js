import React, { Component } from 'react';

class WaveMenu extends Component {
  constructor() {
    super()
    this.state = {
      type: "sine",
      on: false,
      osc: "",
      ctx: ""
    }
  }

  componentDidMount() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    console.log(audioCtx)
    const osc = audioCtx.createOscillator();
    osc.type = this.state.type;
    osc.frequency.value = 440;
    osc.start()
    // osc.connect(audioCtx.destination);
    this.setState({ ctx: audioCtx,
                    osc: osc })
    // this.state.osc.type = 'triangle' // triangle, sine, sawtooth. there are also custom waveforms.
    // this.state.osc.frequency.value = 440 //hz

    // this.state.osc.connect(audioCtx.destination) //connect to another node - destination of AudioContext (output - speakers etc.)
    // osc.start()

    // audioCtx.resume()
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
    let { osc } = this.state;
    osc.type = e.target.id;
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
