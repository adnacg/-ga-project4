import React, { Component } from "react";
import { CardPanel, Button, Col, Row } from "react-materialize";

import "./AdminOrders.css";
import auth from "../../utils/auth";
import { Link } from "react-router-dom";
const fetch = auth.authFetch;

class AdminOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders`);
      const { success, history } = await response.json();
      if (!success) return;
      this.setState({ orders: history });
    } catch (error) {
      console.log(error);
    }
  };

  handleAutoSend = async orderId => {
    // POST request
    const response = await fetch(
      `http://localhost:5000/api/order/${orderId}/dispatch`,
      {
        method: "POST"
      }
    );
    const { success } = await response.json();
    if (!success) return;

    // Redirect to control panel
    this.props.history.push(`/admin/control/${orderId}`);
  };

  render() {
    var sortedOrders = this.state.orders.sort((a, b) => {
      return b.id - a.id;
    });
    const orderPreviews = sortedOrders.map(order => {
      const filteredOrder = {};
      order.products.forEach(item => {
        if (Object.keys(filteredOrder).includes(item.name)) {
          filteredOrder[item.name].count++;
        } else {
          filteredOrder[item.name] = { ...item, count: 1 };
        }
      });
      return (
        <CardPanel className="adminOrderItems z-depth-5">
          <p> Order # : {order.id}</p>
          <p> Order date : {order.date}</p>
          <p>
            Total : ${" "}
            {order.products
              .reduce((acc, current) => acc + current.price, 0)
              .toFixed(2)}
          </p>
          <p className="lightText">
            {order.products.map(product => (
              <span>
                {filteredOrder[product.name].name} x{" "}
                {filteredOrder[product.name].count}{" "}
              </span>
            ))}
          </p>
          {order.deliveryStatus === "Closed" ? (
            <a className="btn orderClosedBtnAdmin">Closed</a>
          ) : (
            <div>
              <a className="btn orderClosedBtnAdmin">{order.deliveryStatus}</a>

              {order.deliveryStatus === "Preparing" ? (
                <Button
                  onClick={() => this.handleAutoSend(order.id)}
                  className="waves-effect waves-light btn orderActiveBtn"
                >
                  Autosend
                </Button>
              ) : (
                <Link
                  to={`/admin/control/${order.id}`}
                  className="waves-effect waves-light btn orderActiveBtn"
                >
                  Track
                </Link>
              )}
            </div>
          )}
        </CardPanel>
      );
    });

    return (
      <div>
        <p className="adminOrderTitle">MASTER ORDERS</p>
        <div className="adminOrderItemsDiv">{orderPreviews}</div>
      </div>
    );
  }
}

export { AdminOrders };
