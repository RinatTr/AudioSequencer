import React, { Component } from 'react';
import '../css/Controller.css';

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {
      dragging: false,
      x_pos: 0,
      y_pos: 0
     }
     this.areaRef = React.createRef();
  }

  toggleDrag = (e) => {
    e.preventDefault();
    this.setState({
      dragging: !this.state.dragging
    })
  }

  handleDrag = (e) => {
    if (this.state.dragging) {
      let t = this.areaRef.current.offsetTop;
      let l = this.areaRef.current.offsetLeft;
      let w = this.areaRef.current.offsetWidth;
      this.setState({
        x_pos: e.clientX - l,
        y_pos: e.clientY - t
      }, this.props.handleChange(null, this.state.y_pos, w))
    }
  }

  render() {
    let divStyle = {
      left: Math.min(this.state.x_pos / 2, 90) + "%",
      top: Math.min(this.state.y_pos / 2, 90) + "%"
    }
      return(
        <div  className="drag-area"
              onMouseMove={this.handleDrag}
              onMouseUp={this.toggleDrag}
              ref={this.areaRef} >
          <div className="drag-circle"
               onMouseDown={this.toggleDrag}
               style={divStyle}>
          </div>
        </div>
      )
    }
}

export default Controller;
