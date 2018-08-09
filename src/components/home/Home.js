import React, { Component } from "react";
import { Button } from "react-materialize";

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <h3>WELCOME TO SNACKY</h3>
        <h6>DELIVER THE SNACKS YOU LOVE, WITH LOVE</h6>
        <p>Please sign in or register to continue.</p>
        <Button waves="light">SIGN IN</Button>&nbsp;
        <Button waves="light">REGISTER</Button>
      </div>
    );
  }
}

export { Home };
