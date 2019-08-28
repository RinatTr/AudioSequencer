import React, { Component } from 'react';

// figure out refs
class Controller extends Component {
  constructor(){
    super()
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
  }
  render() {
      return(
        <div>
          <canvas ref={this.canvasRef} width={100} height={100} />
        </div>
      )
    }
}

export default Controller;
