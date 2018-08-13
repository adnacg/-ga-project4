import React, { Component } from "react";
import { CardPanel } from "react-materialize";

import "./AdminOrders.css";

class AdminOrders extends Component {
  render() {
    return (
      <div>
        <p className="adminOrderTitle">MASTER ORDERS</p>
        <CardPanel className="adminOrderItems z-depth-5">
          <p> Order date : 5 Aug 2018</p>
          <p> Total : $ 15.63</p>
          <p> Order # : 1 </p>
          <p className="lightText">
            1 x Dark Chocolate Bar 90g, 1 x Cremkakao Chocolate Bar 90g, 1 x
            Milk Chocolate Bar 90g, 1 x Hazelnut Chocolate Bar 90g
          </p>
          <a class="waves-effect waves-light btn orderActiveBtn">Active</a>
          <a class="waves-effect waves-light btn orderActiveBtn">Cancel</a>
          <a class="waves-effect waves-light btn orderActiveBtn">Autosend</a>
          <a class="waves-effect waves-light btn orderActiveBtn">Manual</a>
        </CardPanel>
        <CardPanel className="adminOrderItems z-depth-5">
          <p> Order date : 5 Aug 2018</p>
          <p> Total : $ 15.63</p>
          <p className="lightText">
            1 x Dark Chocolate Bar 90g, 1 x Cremkakao Chocolate Bar 90g, 1 x
            Milk Chocolate Bar 90g, 1 x Hazelnut Chocolate Bar 90g
          </p>
          <a class="btn orderClosedBtnAdmin">Closed</a>
        </CardPanel>
      </div>
    );
  }
}

export { AdminOrders };
