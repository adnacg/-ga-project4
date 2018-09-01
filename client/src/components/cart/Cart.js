import React, { Component, Fragment } from "react";
import { CardPanel } from "react-materialize";
import "./Cart.css";

class Cart extends Component {
  render() {
    const cart = this.props.cart;

    // cart prices
    const subtotalRaw = cart
      .reduce((acc, current) => {
        return acc + current.price * current.count;
      }, 0)
      .toFixed(2);
    const subtotal = parseFloat(subtotalRaw);
    const deliveryFeeRaw = (3).toFixed(2);
    const deliveryFee = parseFloat(deliveryFeeRaw);
    const gstRaw = (subtotal * 0.07).toFixed(2);
    const gst = parseFloat(gstRaw);
    const totalRaw = subtotal + deliveryFee + gst;
    const total = parseFloat(totalRaw).toFixed(2);

    // map cart to markup
    const myCart = cart.map(item => (
      <div key={item.id} className="cartItems">
        {this.props.status === "BUILDING" ? (
          <Fragment>
            <a
              onClick={() =>
                this.props.removeFromCartHandler(this.props.user.id, item.id)
              }
              className="btn-floating btn waves-effect waves-light addFromOrderBtn"
            >
              <i className="material-icons addFromOrderIcon">remove</i>
            </a>
            {item.count}
            <a
              onClick={() =>
                this.props.addToCartHandler(this.props.user.id, item.id)
              }
              className="btn-floating btn waves-effect waves-light addFromOrderBtn"
            >
              <i className="material-icons addFromOrderIcon">add</i>
            </a>{" "}
          </Fragment>
        ) : (
          <Fragment>{item.count} x </Fragment>
        )}
        <span>
          {item.name}
          <span className="cartItemPrices">
            $ {(item.price * item.count).toFixed(2)}
          </span>
        </span>
      </div>
    ));

    let deliveryTime = new Date();
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 30);

    return (
      <CardPanel className="sideCart z-depth-3">
        <p>DELIVERING TO</p>
        <p className="lightText">
          Block {this.props.user.block} Level {this.props.user.level} Unit{" "}
          {this.props.user.unit}
        </p>
        <p>ESTIMATED ARRIVAL:</p>
        <p className="lightText">{deliveryTime.toString()}</p>

        <p>Your Cart</p>
        <div className="cartSeparator" />
        {myCart}
        <div className="cartSeparator" />
        <div className="cartTotal">
          <p>
            Subtotal
            <span className="cartPrices">$ {subtotal}</span>
          </p>
          <p>
            Delivery fee
            <span className="cartPrices">$ {deliveryFee}</span>
          </p>
          <p>
            GST
            <span className="cartPrices">$ {gst}</span>
          </p>
          <p className="strongText">
            TOTAL
            <span className="lightText">
              <small> incl. GST</small>
            </span>
            <span className="cartPrices">$ {total}</span>
          </p>
        </div>
        {this.props.status === "BUILDING" ? (
          <Fragment>
            <a
              onClick={() => this.props.checkoutHandler(this.props.user.id)}
              className="waves-effect waves-light btn checkoutBtn"
            >
              CHECKOUT
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <a className="btn statusBtn">
              {this.props.status}
              ...
            </a>
            {this.props.status === "Arrived" && (
              <p>Please collect your order from Snacky.</p>
            )}
          </Fragment>
        )}
      </CardPanel>
    );
  }
}

export { Cart };
