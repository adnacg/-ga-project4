import React, { Component } from "react";
import { Container } from "react-materialize";

import "./Footer.css";

class Foot extends Component {
  render() {
    return (
      <footer className="myFooter">
        <Container>
          <p>
            <a>Terms & Conditions</a> &nbsp;&nbsp;<a>Privacy Policy</a>{" "}
            &nbsp;&nbsp;<a>FAQ</a>
            &nbsp;&nbsp;<a>Contact</a>
          </p>
        </Container>
      </footer>
    );
  }
}

export { Foot };
