import React, { Component, Fragment } from "react";
import { CardPanel } from "react-materialize";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryTime: null
    };
  }

  componentDidMount = async () => {
    const deliveryTime = new Date();
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 30);
    this.setState({ deliveryTime });
  };

  render() {
    const cart = this.props.cart;

    // cart prices

    const subtotal = parseFloat(
      cart.reduce((acc, current) => {
        return acc + current.price * current.count;
      }, 0)
    );
    const deliveryFee = parseFloat(3.0);
    const gst = parseFloat(subtotal * 0.07);
    const total = parseFloat(subtotal + deliveryFee + gst);

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

    return (
      <CardPanel className="sideCart z-depth-3">
        <p>DELIVERING TO</p>
        <p className="lightText">
          Block {this.props.user.block} Level {this.props.user.level} Unit{" "}
          {this.props.user.unit}
        </p>
        <p>ESTIMATED ARRIVAL:</p>
        {this.state.deliveryTime && (
          <p className="lightText">{this.state.deliveryTime.toString()}</p>
        )}

        <p>Your Cart</p>
        <div className="cartSeparator" />
        {myCart}
        <div className="cartSeparator" />
        <div className="cartTotal">
          <p>
            Subtotal
            <span className="cartPrices">$ {subtotal.toFixed(2)}</span>
          </p>
          <p>
            Delivery fee
            <span className="cartPrices">$ {deliveryFee.toFixed(2)}</span>
          </p>
          <p>
            GST
            <span className="cartPrices">$ {gst.toFixed(2)}</span>
          </p>
          <p className="strongText">
            TOTAL
            <span className="lightText">
              <small> incl. GST</small>
            </span>
            <span className="cartPrices">$ {total.toFixed(2)}</span>
          </p>
        </div>
        {this.props.status === "BUILDING" ? (
          subtotal > 1 && (
            <Fragment>
              <a
                onClick={() => this.props.checkoutHandler(this.props.user.id)}
                className="waves-effect waves-light btn checkoutBtn"
              >
                CHECKOUT
              </a>
            </Fragment>
          )
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
