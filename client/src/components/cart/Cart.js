import React, { Component } from "react";
import { CardPanel } from "react-materialize";

import "./Cart.css";

// cart is used in orderpage, mycart, myorder, admincp

class Cart extends Component {
  render() {
    return (
      <CardPanel className="sideCart z-depth-3">
        <p>DELIVERING TO</p>
        <p className="lightText">8 CLAYMORE HILL #03-01, 688888</p>
        <p>
          ESTIMATED ARRIVAL: <span className="lightText">14:00</span>
        </p>
        <p>Your Cart</p>
        <div className="cartSeparator" />
        <div className="cartItems">
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">remove</i>
          </a>
          12
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">add</i>
          </a>
          <span>
            Hazelnut Quadratini Mini 125g
            <span className="cartItemPrices">$ 2.95</span>
          </span>
        </div>
        <div className="cartItems">
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">remove</i>
          </a>
          12
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">add</i>
          </a>
          <span>
            Hazelnut Quadratini Mini 125g
            <span className="cartItemPrices">$ 2.95</span>
          </span>
        </div>
        <div className="cartItems">
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">remove</i>
          </a>
          12
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">add</i>
          </a>
          <span>
            Hazelnut Quadratini Mini 125g
            <span className="cartItemPrices">$ 2.95</span>
          </span>
        </div>
        <div className="cartItems">
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">remove</i>
          </a>
          12
          <a className="btn-floating btn waves-effect waves-light addFromOrderBtn">
            <i className="material-icons addFromOrderIcon">add</i>
          </a>
          <span>
            Hazelnut Quadratini Mini 125g
            <span className="cartItemPrices">$ 2.95</span>
          </span>
        </div>
        <div className="cartSeparator" />
        <div className="cartTotal">
          <p>
            Subtotal
            <span className="cartPrices">$ 11.80</span>
          </p>
          <p>
            Delivery fee
            <span className="cartPrices">$ 3.00</span>
          </p>
          <p>
            GST
            <span className="cartPrices">$ 0.83</span>
          </p>
          <p className="strongText">
            TOTAL{" "}
            <span className="lightText">
              <small>incl. GST</small>
            </span>
            <span className="cartPrices">$ 15.63</span>
          </p>
        </div>
        <a class="waves-effect waves-light btn checkoutBtn">CHECKOUT</a>
        <br />
        <a class="waves-effect waves-light btn statusBtn">ON THE WAY...</a>
        <br />
        <a class="waves-effect waves-light btn statusBtn">ARRIVED!</a>
        <p>Please collect your order from Snacky.</p>
      </CardPanel>
    );
  }
}

export { Cart };
