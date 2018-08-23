import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./Profile.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount = async () => {
    const userId = auth.getUserId();

    // Get current user
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      this.setState({ user: data });
    } catch (error) {
      console.log(error);
    }
  };

  changeProfileHandler(event) {
    // on input change, set state
  }

  clickHandler() {
    // if input.length > 0, update database
  }

  render() {
    return (
      <div className="myProfile">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <p className="profileTitle">UPDATE PROFILE</p>
            <Input
              s={12}
              m={12}
              l={12}
              placeholder="Block"
              onChange={this.changeHandler}
            />
            <Input
              s={6}
              m={6}
              l={6}
              offset="m3 l3"
              placeholder="Level"
              onChange={this.changeHandler}
            />
            <Input
              s={6}
              m={6}
              l={6}
              offset="m3 l3"
              placeholder="Unit"
              onChange={this.changeHandler}
            />
            <Input
              s={12}
              m={12}
              l={12}
              placeholder="Phone"
              onChange={this.changeHandler}
            />
            <Col s={12} m={12} l={12}>
              <a className="waves-effect waves-light btn saveBtn">
                SAVE PROFILE
              </a>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Profile };
