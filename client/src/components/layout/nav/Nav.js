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
import { withRouter } from "react-router-dom";
import auth from "../../../utils/auth";
import "./Nav.css";

class Nav extends Component {
  handleSignOut = () => {
    auth.signout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Row>
          <Navbar className="myNav">
            {auth.isAuthenticated() ? (
              <Container>
                <Link to="/browse">
                  <NavItem className="brandName">SNACKY</NavItem>
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
                    <div>ALL</div>
                  </Link>
                  <Link to="/browse/chocolate">
                    <div>CHOCOLATE</div>
                  </Link>
                  <Link to="/browse/candy">
                    <div>CANDY</div>
                  </Link>
                  <Link to="/browse/biscuit">
                    <div>BISCUIT</div>
                  </Link>
                  <Link to="/browse/cookie">
                    <div>COOKIE</div>
                  </Link>
                  <Link to="/browse/cracker">
                    <div>CRACKER</div>
                  </Link>
                  <Link to="/browse/mint">
                    <div>MINT</div>
                  </Link>
                  <Link to="/browse/gummy">
                    <div>GUMMY</div>
                  </Link>
                  <Link to="/browse/savoury">
                    <div>SAVOURY</div>
                  </Link>
                  <Link to="/browse/beverage">
                    <div>BEVERAGE</div>
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
                    <div>TRACK ORDER</div>
                  </Link>
                  <Link to="/orders">
                    <div>HISTORY</div>
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
                    <div>SETTING</div>
                  </Link>
                  <a onClick={this.handleSignOut}>SIGN OUT</a>
                </Dropdown>

                {auth.isAllowed(["admin"]) && (
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
                      <div>DASHBOARD</div>
                    </Link>
                    <Link to="/admin/control">
                      <div>CONTROL</div>
                    </Link>
                  </Dropdown>
                )}

                <Link to="/mycart">
                  <NavItem>
                    <Icon>shopping_cart</Icon>
                  </NavItem>
                </Link>
              </Container>
            ) : (
              <Container>
                <Link to="/">
                  <NavItem className="brandName">SNACKY</NavItem>
                </Link>

                <Link to="/signin">
                  <NavItem>SIGN IN</NavItem>
                </Link>
                <Link to="/register">
                  <NavItem>REGISTER</NavItem>
                </Link>
              </Container>
            )}
          </Navbar>
        </Row>
      </div>
    );
  }
}

export default withRouter(Nav);
