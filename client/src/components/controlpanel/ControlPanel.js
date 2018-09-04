import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Map } from "../map/Map";
import { Cart } from "../cart/Cart";
import { HOST, port } from "../../constants";

import { subscribeToPose, unsubscribeToPose } from "../../utils/ws";
import "./ControlPanel.css";

import auth from "../../utils/auth";
const fetch = auth.authFetch;

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 44,
      y: 180,
      status: "On the way",

      currentOrderContent: null,
      currentOrderStatus: "",
      user: {},

      loading: true
    };
  }

  componentDidMount = async () => {
    const orderId = this.props.match.params.orderId;

    subscribeToPose(orderId, (err, state) => {
      this.setState(state);
    });

    // Get current order's user
    try {
      const response = await fetch(
        `http://${HOST}:${port}/api/order/${orderId}`
      );
      const { success, user, orderStatus } = await response.json();
      if (orderStatus === "Closed") {
        return this.props.history.push("/admin/orders");
      }
      if (!success) return;
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }

    // get current order
    const userId = this.state.user.id;
    try {
      const response = await fetch(
        `http://${HOST}:${port}/api/user/${userId}/order`
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

    this.setState({ loading: false });
  };

  componentWillUnmount = () => {
    unsubscribeToPose();
  };

  render() {
    const { x, y, status, loading } = this.state;
    if (loading) return null;
    return (
      <Row>
        <Col s={12} m={12} l={8}>
          <p className="cpTitle">
            SNACKY STATUS:{" "}
            <span className="btn snackyStatus">{status.toUpperCase()}</span>
          </p>
          <div className="cpMap">
            <Map x={x} y={y} status={status} />
          </div>
        </Col>
        <Col s={10} m={8} l={4} offset="s1 m2">
          <div className="cpCart">
            <Cart
              cart={this.state.currentOrderContent}
              user={this.state.user}
              status={status}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export { ControlPanel };
