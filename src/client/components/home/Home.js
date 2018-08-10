import React, { Component } from "react";
import { Button, Row } from "react-materialize";

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="myHome">
        <h3>WELCOME TO SNACKY</h3>
        <h6>DELIVER THE SNACKS YOU LOVE, WITH LOVE</h6>
        <Row class="homeAction">
          <p>Please sign in or register to continue.</p>
          <span class="homeBtn">
            <Button waves="light">SIGN IN</Button>
          </span>
          <span class="homeBtn">
            <Button waves="light">REGISTER</Button>
          </span>
        </Row>
      </div>
    );
  }
}

export { Home };
