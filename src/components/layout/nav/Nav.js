import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavItem,
  Dropdown
} from "react-materialize";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar class="myNav">
            <Container>
              <NavItem href="#">SNACKY</NavItem>
              <Dropdown
                trigger={<NavItem>BROWSE</NavItem>}
                className="dropdownList"
              >
                <NavItem>CHOCOLATE</NavItem>
                <NavItem>CANDY</NavItem>
                <NavItem>BISCUIT</NavItem>
                <NavItem>COOKIE</NavItem>
                <NavItem>CRACKER</NavItem>
                <NavItem>MINT</NavItem>
                <NavItem>GUMMY</NavItem>
                <NavItem>SAVOURY</NavItem>
                <NavItem>BEVERAGE</NavItem>
              </Dropdown>
              <NavItem>SIGN IN</NavItem>
              <NavItem>REGISTER</NavItem>
            </Container>
          </Navbar>
        </Row>
      </div>
    );
  }
}

export { Nav };
