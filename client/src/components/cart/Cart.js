import React, { Component } from "react";
import { CardPanel } from "react-materialize";
import "./Cart.css";

// cart is used in orderpage, mycart, myorder, admincp

class Cart extends Component {
  render() {
    const cart = this.props.cart;

    // pre-process the cart data for display
    const filteredCart = {};
    cart.forEach(item => {
      if (Object.keys(filteredCart).includes(item.name)) {
        filteredCart[item.name].count++;
        filteredCart[item.name].price =
          item.price * filteredCart[item.name].count;
      } else {
        filteredCart[item.name] = { ...item, count: 1 };
      }
    });

    // cart prices
    const subtotalRaw = cart
      .reduce((acc, current) => acc + current.price, 0)
      .toFixed(2);
    const subtotal = parseFloat(subtotalRaw);
    const deliveryFeeRaw = (3).toFixed(2);
    const deliveryFee = parseFloat(deliveryFeeRaw);
    const gstRaw = (subtotal * 0.07).toFixed(2);
    const gst = parseFloat(gstRaw);
    const totalRaw = subtotal + deliveryFee + gst;
    const total = parseFloat(totalRaw).toFixed(2);

    // map filteredCart to markup
    const myCart = Object.keys(filteredCart).map(name => (
      <div key={name} className="cartItems">
        <a
          onClick={() =>
            this.props.removeFromCartHandler(this.props.user.id, {
              id: filteredCart[name].id,
              name: name,
              price: filteredCart[name].price
            })
          }
          className="btn-floating btn waves-effect waves-light addFromOrderBtn"
        >
          <i className="material-icons addFromOrderIcon">remove</i>
        </a>
        {filteredCart[name].count}
        <a
          onClick={() =>
            this.props.addToCartHandler(this.props.user.id, {
              id: filteredCart[name].id,
              name: name,
              price: filteredCart[name].price
            })
          }
          className="btn-floating btn waves-effect waves-light addFromOrderBtn"
        >
          <i className="material-icons addFromOrderIcon">add</i>
        </a>
        <span>
          {name}
          <span className="cartItemPrices">$ {filteredCart[name].price}</span>
        </span>
      </div>
    ));

    return (
      <CardPanel className="sideCart z-depth-3">
        <p>DELIVERING TO</p>
        <p className="lightText">
          {this.props.user.address} {this.props.user.unit}{" "}
          {this.props.user.postal}
        </p>
        <p>
          ESTIMATED ARRIVAL: <span className="lightText">{Date()}</span>
        </p>
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
        <a
          onClick={() => this.props.checkoutHandler(this.props.user.id)}
          class="waves-effect waves-light btn checkoutBtn"
        >
          CHECKOUT
        </a>
        {/* <br />
        <a class="waves-effect waves-light btn statusBtn">ON THE WAY...</a>
        <br />
        <a class="waves-effect waves-light btn statusBtn">ARRIVED!</a>
        <p>Please collect your order from Snacky.</p> */}
      </CardPanel>
    );
  }
}

export { Cart };
