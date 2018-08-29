import React, { Component } from "react";
import { CardPanel } from "react-materialize";

import "./AdminOrders.css";
import auth from "../../utils/auth";
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
      const data = await response.json();
      console.log(data);
      this.setState({ orders: data });
    } catch (error) {
      console.log(error);
    }
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
              <a className="waves-effect waves-light btn orderActiveBtn">
                {order.deliveryStatus}
              </a>
              <a className="waves-effect waves-light btn orderActiveBtn">
                Cancel
              </a>
              <a className="waves-effect waves-light btn orderActiveBtn">
                Autosend
              </a>
              <a className="waves-effect waves-light btn orderActiveBtn">
                Manual
              </a>
            </div>
          )}
        </CardPanel>
      );
    });

    return (
      <div>
        <p className="adminOrderTitle">MASTER ORDERS</p>
        {orderPreviews}
      </div>
    );
  }
}

export { AdminOrders };
