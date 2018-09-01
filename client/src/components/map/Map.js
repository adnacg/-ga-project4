import React, { Component } from "react";

import "./Map.css";
import img from "../../assets/map.png";
import { subscribeToPose, unsubscribeToPose } from "../../utils/ws";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      status: "On the way"
    };
  }

  componentDidMount = () => {
    this.updateCanvas();
    console.log("Subscribing");

    subscribeToPose(this.props.orderId, (err, state) => {
      console.log(state);
      this.setState(state);
      this.updateCanvas();
    });
  };

  componentWillUnmount = () => {
    console.log("Unsubscribing");
    unsubscribeToPose();
  };

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    const { x, y } = this.state;

    // Display map
    const map = new Image();
    map.src = img;
    map.onload = () => {
      ctx.drawImage(map, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(x, y, 40, 30, "red");
    };

    // Display robot
  }

  render() {
    return <canvas ref="canvas" width={300} height={300} />; //<div>{this.state.pose}</div>;
  }
}

export { Map };
