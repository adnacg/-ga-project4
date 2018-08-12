import React, { Component } from "react";
import { Row, Icon, Col } from "react-materialize";

import "./EmptyCart.css";

class EmptyCart extends Component {
  render() {
    return (
      <div>
        <div className="emptyCartDiv">
          <Icon className="bigCart">shopping_cart</Icon>
          <span className="bigCart bigQ">?</span>
        </div>
        <div className=" emptyCartDiv browseActBtnDiv">
          <div>Uh oh... seems like your cart is empty.</div>
          <a className="waves-effect waves-light btn browseActBtn">
            Browse For Snacks
          </a>
        </div>
      </div>
    );
  }
}

export { EmptyCart };
