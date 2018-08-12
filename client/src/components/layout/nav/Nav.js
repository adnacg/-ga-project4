import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavItem,
  Dropdown,
  Icon
} from "react-materialize";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar class="myNav">
            <Container>
              <Link to="/">
                <NavItem href="#">SNACKY</NavItem>
              </Link>
              <Dropdown
                trigger={<NavItem>BROWSE</NavItem>}
                className="dropdownList"
              >
                <Link to="/browse">
                  <NavItem>ALL</NavItem>
                </Link>
                <Link to="/browse/chocolate">
                  <NavItem>CHOCOLATE</NavItem>
                </Link>
                <NavItem>CANDY</NavItem>
                <NavItem>BISCUIT</NavItem>
                <NavItem>COOKIE</NavItem>
                <NavItem>CRACKER</NavItem>
                <NavItem>MINT</NavItem>
                <NavItem>GUMMY</NavItem>
                <NavItem>SAVOURY</NavItem>
                <NavItem>BEVERAGE</NavItem>
              </Dropdown>
              <Dropdown
                trigger={<NavItem>MY ORDERS</NavItem>}
                className="dropdownList"
              >
                <NavItem>TRACK ORDER</NavItem>
                <Link to="/orders">
                  <NavItem>HISTORY</NavItem>
                </Link>
              </Dropdown>
              <Dropdown
                trigger={<NavItem>PROFILE</NavItem>}
                className="dropdownList"
              >
                <NavItem>SETTING</NavItem>
                <NavItem>SIGN OUT</NavItem>
              </Dropdown>
              <Link to="/signin">
                <NavItem>SIGN IN</NavItem>
              </Link>
              <Link to="/register">
                <NavItem>REGISTER</NavItem>
              </Link>
              <Link to="/admin/control">
                <NavItem>DASHBOARD</NavItem>
              </Link>
              <Link to="/cart">
                <Icon>shopping_cart</Icon>
              </Link>
            </Container>
          </Navbar>
        </Row>
      </div>
    );
  }
}

export { Nav };