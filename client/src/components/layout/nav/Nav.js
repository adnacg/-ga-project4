import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
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
                trigger={
                  <NavItem>
                    BROWSE
                    <Icon right>arrow_drop_down</Icon>
                  </NavItem>
                }
                className="dropdownList"
              >
                <Link to="/browse">
                  <NavItem>ALL</NavItem>
                </Link>
                <Link to="/browse/chocolate">
                  <NavItem>CHOCOLATE</NavItem>
                </Link>
                <Link to="/browse/candy">
                  <NavItem>CANDY</NavItem>
                </Link>
                <Link to="/browse/biscuit">
                  <NavItem>BISCUIT</NavItem>
                </Link>
                <Link to="/browse/cookie">
                  <NavItem>COOKIE</NavItem>
                </Link>
                <Link to="/browse/cracker">
                  <NavItem>CRACKER</NavItem>
                </Link>
                <Link to="/browse/mint">
                  <NavItem>MINT</NavItem>
                </Link>
                <Link to="/browse/gummy">
                  <NavItem>GUMMY</NavItem>
                </Link>
                <Link to="/browse/savoury">
                  <NavItem>SAVOURY</NavItem>
                </Link>
                <Link to="/browse/beverage">
                  <NavItem>BEVERAGE</NavItem>
                </Link>
              </Dropdown>
              <Dropdown
                trigger={
                  <NavItem>
                    MY ORDERS
                    <Icon right>arrow_drop_down</Icon>
                  </NavItem>
                }
                className="dropdownList"
              >
                <Link to="/myorder">
                  <NavItem>TRACK ORDER</NavItem>
                </Link>
                <Link to="/orders">
                  <NavItem>HISTORY</NavItem>
                </Link>
              </Dropdown>
              <Dropdown
                trigger={
                  <NavItem>
                    PROFILE
                    <Icon right>arrow_drop_down</Icon>
                  </NavItem>
                }
                className="dropdownList"
              >
                <Link to="/profile">
                  <NavItem>SETTING</NavItem>
                </Link>
                <NavItem>SIGN OUT</NavItem>
              </Dropdown>
              <Link to="/signin">
                <NavItem>SIGN IN</NavItem>
              </Link>
              <Link to="/register">
                <NavItem>REGISTER</NavItem>
              </Link>

              <Dropdown
                trigger={
                  <NavItem>
                    ADMIN
                    <Icon right>arrow_drop_down</Icon>
                  </NavItem>
                }
                className="dropdownList"
              >
                <Link to="/admin/orders">
                  <NavItem>DASHBOARD</NavItem>
                </Link>
                <Link to="/admin/control">
                  <NavItem>CONTROL</NavItem>
                </Link>
              </Dropdown>

              <Link to="/mycart">
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
