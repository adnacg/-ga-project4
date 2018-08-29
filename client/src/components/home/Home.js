import React, { Component } from "react";
import { Row } from "react-materialize";
import { Link } from "react-router-dom";

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="myHome">
        <h3>WELCOME TO SNACKY</h3>
        <h6>DELIVER THE SNACKS YOU LOVE, WITH LOVE</h6>
        <Row className="homeAction">
          <p>Please sign in or register to continue.</p>
          <Link to="/signin" className="waves-effect waves-light btn homeBtn">
            SIGN IN
          </Link>
          <Link to="/register" className="waves-effect waves-light btn homeBtn">
            REGISTER
          </Link>
        </Row>
      </div>
    );
  }
}

export { Home };
