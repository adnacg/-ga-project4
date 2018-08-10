import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import { Base } from "./client/components/layout/base/Base";
import { Home } from "./client/components/home/Home";
import { Signin } from "./client/components/signin/Signin";
import { Register } from "./client/components/register/Register";
import { AdminSignin } from "./client/components/adminsignin/AdminSignin";

class App extends Component {
  render() {
    return (
      <Base>
        <Row>
          <Container>
            <AdminSignin />
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
