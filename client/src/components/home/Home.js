import React, { Component } from "react";
import { Row } from "react-materialize";

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="myHome">
        <h3>WELCOME TO SNACKY</h3>
        <h6>DELIVER THE SNACKS YOU LOVE, WITH LOVE</h6>
        <Row class="homeAction">
          <p>Please sign in or register to continue.</p>
          <a className="waves-effect waves-light btn homeBtn">SIGN IN</a>
          <a class="waves-effect waves-light btn homeBtn">REGISTER</a>
        </Row>
      </div>
    );
  }
}

export { Home };
