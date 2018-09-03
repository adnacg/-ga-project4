import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Map } from "../map/Map";
import { Cart } from "../cart/Cart";

import { subscribeToPose, unsubscribeToPose } from "../../utils/ws";

import "./MyOrder.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class MyOrder extends Component {
  constructor() {
    super();
    this.state = {
      x: 44,
      y: 180,
      status: "Preparing",
      orderId: "",
      currentOrderContent: null,
      currentOrderStatus: "",
      user: {}
    };
  }

  componentDidMount = async () => {
    // Get current user
    const userId = auth.getUserId();
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const { success, user } = await response.json();
      if (!success) return;
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }

    // Get current user order
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/order`
      );
      const {
        success,
        orderStatus,
        orderProducts,
        orderId
      } = await response.json();

      if (!success) return;
      this.setState({
        orderId,
        currentOrderStatus: orderStatus,
        currentOrderContent: orderProducts
      });
    } catch (error) {
      console.log(error);
    }

    subscribeToPose(this.state.orderId, (err, state) => {
      this.setState(state);
    });
  };

  componentWillUnmount = () => {
    unsubscribeToPose();
  };

  render() {
    const { x, y, status } = this.state;
    if (this.state.currentOrderContent) {
      return (
        <div>
          <Row>
            <Col s={12} m={8}>
              <p className="myorderTitle">TRACK ORDER</p>
              <Map x={x} y={y} status={status} />
            </Col>
            <Col s={12} m={4}>
              <Cart
                cart={this.state.currentOrderContent}
                user={this.state.user}
                status={status}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      return <p className="emptyCartDiv">No orders yet :(</p>;
    }
  }
}

export { MyOrder };
