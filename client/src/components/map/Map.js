import React, { Component } from "react";

import "./Map.css";
import img from "../../assets/map.jpg";
import robotImg from "../../assets/snacky.png";

class Map extends Component {
  componentDidMount = () => {
    this.updateCanvas(this.props);
  };

  componentWillReceiveProps = props => {
    this.updateCanvas(props);
  };

  updateCanvas(props) {
    const ctx = this.refs.canvas.getContext("2d");
    const { x, y } = props;

    const map = new Image();
    map.src = img;
    map.onload = () => {
      // Display map
      ctx.drawImage(map, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
      // Display Robot
      const robot = new Image();
      robot.src = robotImg;
      robot.onload = () => {
        if (this.props.status === "Arrived") {
          ctx.fillStyle = "#726A95";
        } else if (this.props.status === "Preparing") {
          ctx.fillStyle = "#A0C1B8";
        } else {
          ctx.fillStyle = "#f4e8c1";
        }
        ctx.fillRect(x, y + 5, 50, 60, "red");
        ctx.drawImage(robot, x, y, 50, 65);
      };
    };
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={500} height={327} />
      </div>
    );
  }
}

export { Map };
