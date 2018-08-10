import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import { Base } from "./client/components/layout/base/Base";
import { Home } from "./client/components/home/Home";

class App extends Component {
  render() {
    return (
      <Base>
        <Row>
          <Container>
            <Home />
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
