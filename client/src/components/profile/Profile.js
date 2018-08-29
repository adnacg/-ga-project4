import React, { Component } from "react";
import { Col, Row, Input } from "react-materialize";

import "./Profile.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      block: "",
      level: "",
      unit: "",
      phone: ""
    };
  }

  componentDidMount = async () => {
    const userId = auth.getUserId();
    // Get current user
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      this.setState({
        user: data,
        block: data.block,
        level: data.level,
        unit: data.unit,
        phone: data.phone
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeHandler = input => event => {
    this.setState({
      [input]: event.target.value
    });
  };

  clickHandler = async () => {
    const userId = auth.getUserId();
    let validForm = true;

    Object.values(this.state).forEach(value => {
      if (value.length === 0) {
        validForm = false;
      }
    });

    if (validForm) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}/update`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
          }
        );
        const { success } = await response.json();
        if (!success) {
          this.props.history.push("/browse");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

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
              label="Block"
              onChange={this.changeHandler("block")}
              placeholder={this.state.block}
              value={this.state.block}
              name="block"
            />
            <Input
              s={6}
              m={6}
              l={6}
              offset="m3 l3"
              label="Level"
              onChange={this.changeHandler("level")}
              placeholder={this.state.level}
              value={this.state.level}
              name="level"
            />
            <Input
              s={6}
              m={6}
              l={6}
              offset="m3 l3"
              label="Unit"
              onChange={this.changeHandler("unit")}
              placeholder={this.state.unit}
              value={this.state.unit}
              name="unit"
            />
            <Input
              s={12}
              m={12}
              l={12}
              label="Phone"
              onChange={this.changeHandler("phone")}
              placeholder={this.state.phone}
              value={this.state.phone}
              name="phone"
            />
            <Col s={12} m={12} l={12}>
              <a
                className="waves-effect waves-light btn saveBtn"
                onClick={this.clickHandler}
              >
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
