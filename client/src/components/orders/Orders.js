import React, { Component } from "react";
import { CardPanel } from "react-materialize";
import { HOST, port } from "../../constants";

import "./Orders.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    const userId = auth.getUserId();
    try {
      const response = await fetch(
        `http://${HOST}:${port}/api/user/${userId}/orders`
      );
      const { success, history } = await response.json();
      if (!success) return;
      this.setState({ orders: history });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const orderPreviews = this.state.orders.map(order => {
      const filteredOrder = {};
      order.products.forEach(item => {
        if (Object.keys(filteredOrder).includes(item.name)) {
          filteredOrder[item.name].count++;
        } else {
          filteredOrder[item.name] = { ...item, count: 1 };
        }
      });
      return (
        <CardPanel className="historyItems z-depth-5">
          <p> Order date : {order.date}</p>
          <p>
            {" "}
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
          <a className="btn orderClosedBtn">Closed</a>
        </CardPanel>
      );
    });

    return (
      <div>
        <p className="historyTitle">ORDER HISTORY</p>
        {orderPreviews}
      </div>
    );
  }
}

export { Orders };
