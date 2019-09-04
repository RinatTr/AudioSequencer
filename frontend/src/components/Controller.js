import React, { Component } from 'react';
import '../css/Controller.css';

class Controller extends Component {
  constructor(){
    super()
    this.canvasRef = React.createRef();
    this.state = {
      dragging: false,
      ctx: ""
     }
  }

  componentDidMount() {
      this.canvas = this.canvasRef.current;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.fillStyle = "#6C6C6C;"
      this.ctx.beginPath();
      this.ctx.arc(50, 50, 10, 0, 2 * Math.PI); //x,y,r, startAngle, endAngle
      this.ctx.stroke();
  }

  toggleDrag = (e) => {
    this.setState({
      dragging: !this.state.dragging
    })
  }

  handleDrag = (e) => {
    if (this.state.dragging) {
      console.log(e.clientX, e.clientY - 22)
    }
  }

  render() {
      return(
        <div className="canvas-wrapper"
          onMouseDown={this.toggleDrag}
          onMouseMove={this.handleDrag}
          onMouseUp={this.toggleDrag}
          >
          <canvas id="controller-canvas" ref={this.canvasRef} width={200} height={200} />
        </div>
      )
    }
}

export default Controller;
