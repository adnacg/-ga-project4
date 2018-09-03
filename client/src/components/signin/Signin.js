import React, { Component } from "react";
import { Col, Row, Input, Button } from "react-materialize";
import { Link } from "react-router-dom";
import auth from "../../utils/auth";
import _ from "lodash";

import "./Signin.css";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "",
        password: ""
      }
    };
  }

  changeFormData = event => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState(({ user }) => ({
      user: _.set(user, field, value)
    }));
  };

  handleSignIn = async event => {
    event.preventDefault();
    const { user } = this.state;
    const success = await auth.authenticate(user.email, user.password);

    // Need to handle backend feedback
    if (success) {
      this.props.history.push("/browse");
    }
  };

  render() {
    return (
      <div className="mySignin">
        <Row>
          <Col s={12} m={8} l={6} offset="m2 l3">
            <form onSubmit={this.handleSignIn}>
              <p className="myTitle">SIGN IN</p>
              <Input
                s={12}
                label="Email"
                name="email"
                onChange={this.changeFormData}
              />
              <Input
                s={12}
                type="password"
                label="Password"
                name="password"
                onChange={this.changeFormData}
              />
              <Button
                type="submit"
                className="waves-effect waves-light btn signinBtn"
              >
                SIGN IN
              </Button>
              <p>
                Don’t have an account? Register{" "}
                <Link to="/register" className="regPrompt">
                  here
                </Link>
                .
              </p>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export { Signin };
