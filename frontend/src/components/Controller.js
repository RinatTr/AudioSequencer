import React, { Component } from 'react';
import '../css/Controller.css';

class Controller extends Component {
  constructor(){
    super()
    this.state = {
      dragging: false,
      x_pos: 0,
      y_pos: 0
     }
  }

  toggleDrag = (e) => {
    this.setState({
      dragging: !this.state.dragging
    })
  }

  handleDrag = (e) => {
    if (this.state.dragging) {
      //adapt to offset at div height
      console.log(e.clientX, e.clientY - 22)
      this.setState({
        x_pos: e.clientX,
        y_pos: e.clientY - 22
      })
    }
  }

  render() {
    let divStyle = {
      left: Math.min(this.state.x_pos / 2, 94) + "%",
      top: Math.min(this.state.y_pos / 2, 94) + "%"
    }
      return(
        <div  className="drag-area"
              onMouseMove={this.handleDrag}
              onMouseUp={this.toggleDrag} >
          <div className="drag-circle"
               onMouseDown={this.toggleDrag}
               style={divStyle}>
          </div>
        </div>
      )
    }
}

export default Controller;
