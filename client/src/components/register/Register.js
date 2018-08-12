import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./Register.css";

class Register extends Component {
  render() {
    return (
      <div className="myRegister">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <p class="regTitle">REGISTER</p>
            <Input s={12} m={12} l={6} offset="l3" label="Email" />
            <Input s={12} m={12} l={6} offset="l3" label="Full Name" />
            <Input s={12} m={12} l={6} offset="l3" label="Address" />
            <Input s={6} m={6} l={3} offset="m3 l3" label="Unit No." />
            <Input s={6} m={6} l={3} offset="m3 l3" label="Postal Code" />
            <Input s={12} m={12} l={6} offset="l3" label="Contact No." />
            <Input
              s={12}
              m={12}
              l={6}
              offset="l3"
              type="password"
              label="Password"
            />
            <Col s={12} m={12} l={12}>
              <a class="waves-effect waves-light btn regBtn">REGISTER</a>
              <p>Already have an account? Sign in here.</p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Register };
