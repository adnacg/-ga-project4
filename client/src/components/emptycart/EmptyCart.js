import React, { Component } from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";

import "./EmptyCart.css";

class EmptyCart extends Component {
  render() {
    return (
      <div>
        <div className="emptyCartDiv">
          <Icon className="bigCart">shopping_cart</Icon>
          <span className="bigCart bigQ">?</span>
        </div>
        <div className="emptyCartDiv browseActBtnDiv">
          <div>Uh oh... seems like your cart is empty.</div>
          <Link
            to="/browse"
            className="waves-effect waves-light btn browseActBtn"
          >
            Browse For Snacks
          </Link>
        </div>
      </div>
    );
  }
}

export { EmptyCart };
