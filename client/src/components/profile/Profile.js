import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="myProfile">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <p class="profileTitle">PROFILE</p>
            <Input s={12} m={12} l={12} label="Address" />
            <Input s={6} m={6} l={6} offset="m3 l3" label="Unit No." />
            <Input s={6} m={6} l={6} offset="m3 l3" label="Postal Code" />
            <Input s={12} m={12} l={12} label="Contact No." />
            <Col s={12} m={12} l={12}>
              <a class="waves-effect waves-light btn saveBtn">SAVE PROFILE</a>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Profile };
