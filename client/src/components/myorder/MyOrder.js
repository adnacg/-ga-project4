import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./MyOrder.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class MyOrder extends Component {
  constructor() {
    super();
    this.state = {
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
      const { success, orderStatus, orderProducts } = await response.json();

      if (!success) return;
      this.setState({
        currentOrderStatus: orderStatus,
        currentOrderContent: orderProducts
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Row>
          <p className="myorderTitle">My Order</p>
          <Col s={12} m={6} offset={"m3"}>
            {this.state.currentOrderContent ? (
              <Cart
                cart={this.state.currentOrderContent}
                user={this.state.user}
                status={this.state.currentOrderStatus}
              />
            ) : (
              <p className="emptyCartDiv">No orders yet :(</p>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export { MyOrder };
