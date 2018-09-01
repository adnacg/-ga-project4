import React, { Component } from "react";
import { Row } from "react-materialize";
import { Link, Redirect } from "react-router-dom";

import "./Home.css";
import auth from "../../utils/auth";

class Home extends Component {
  render() {
    return !auth.getUserId() ? (
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
    ) : (
      <Redirect to="/browse" />
    );
  }
}

export { Home };
