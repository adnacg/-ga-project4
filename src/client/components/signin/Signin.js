import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./Signin.css";

class Signin extends Component {
  render() {
    return (
      <div className="mySignin">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <p class="myTitle">SIGN IN</p>
            <Input s={12} label="Email" />
            <Input s={12} type="password" label="Password" />
            <a class="waves-effect waves-light btn signinBtn">SIGN IN</a>
            <p>Don’t have an account? Register here.</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Signin };
