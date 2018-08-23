import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./AdminSignin.css";

class AdminSignin extends Component {
  render() {
    return (
      <div className="myAdminSignin">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <p className="myAdminTitle">ADMIN SIGN IN</p>
            <Input s={12} label="Email" />
            <Input s={12} type="password" label="Password" />
            <a className="waves-effect waves-light btn adminSigninBtn">
              SIGN IN
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export { AdminSignin };
