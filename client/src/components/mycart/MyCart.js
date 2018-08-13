import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";
import { EmptyCart } from "../emptycart/EmptyCart";

import "./MyCart.css";

class MyCart extends Component {
  render() {
    return (
      <div>
        <Row>
          <p className="mycartTitle">My Cart</p>
          <Col s={12} m={6} offset={"m3"}>
            <Cart />
          </Col>
        </Row>
      </div>
    );
  }
}

export { MyCart };
