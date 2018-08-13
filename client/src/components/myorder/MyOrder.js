import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./MyOrder.css";

class MyOrder extends Component {
  render() {
    return (
      <div>
        <Row>
          <p className="myorderTitle">My Order</p>
          <Col s={12} m={6} offset={"m3"}>
            <Cart />
          </Col>
        </Row>
      </div>
    );
  }
}

export { MyOrder };
