import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";
import { EmptyCart } from "../emptycart/EmptyCart";

import "./MyCart.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      user: {},
      // currentOrderContent: null,
      // currentOrderStatus: "",
      loading: true
    };
  }

  componentDidMount = async () => {
    const userId = auth.getUserId();
    // Get current user
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const { success, user } = await response.json();
      if (!success) return;
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }

    // Get current user cart
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`
      );
      const { success, cart } = await response.json();
      if (!success) return;
      this.setState({ cart });
    } catch (error) {
      console.log(error);
    }

    // Check if current user has active order
    //   try {
    //     const response = await fetch(
    //       `http://localhost:5000/api/user/${userId}/order`
    //     );
    //     const { success, orderStatus, orderProducts } = await response.json();
    //     console.log("order products:", orderProducts);

    //     if (!success) return;
    //     this.setState({
    //       currentOrderStatus: orderStatus,
    //       currentOrderContent: orderProducts
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    this.setState({ loading: false });
  };

  addToCartHandler = async (userId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product?product_id=${productId}`,
        {
          method: "POST"
        }
      );
      const { success } = await response.json();
      if (!success) console.log("Failed to add product to cart");
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`
      );
      const { success, cart } = await response.json();
      if (!success) return;
      this.setState({ cart });
    } catch (error) {
      console.log(error);
    }
  };

  removeFromCartHandler = async (userId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product/${productId}`,
        {
          method: "DELETE"
        }
      );
      const { success } = await response.json();
      if (!success) console.log("Failed to remove product to cart");
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`
      );
      const { success, cart } = await response.json();
      if (!success) return;
      this.setState({ cart });
    } catch (error) {
      console.log(error);
    }
  };

  checkoutHandler = async userId => {
    // Send order creation request to backend
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/order`,
        {
          method: "POST"
        }
      );
      const { success } = await response.json();
      if (!success) return;
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`,
        {
          method: "DELETE"
        }
      );
      const { success } = await response.json().success;
      if (!success) return;
    } catch (error) {
      console.log(error);
    }

    // Redirect to track order
    this.props.history.push("/myorder");
  };

  render() {
    if (this.state.loading) {
      return null;
    }
    if (this.state.cart.length > 0) {
      return (
        <div>
          <Row>
            <p className="mycartTitle">My Cart</p>
            <Col s={12} m={6} offset={"m3"}>
              <Cart
                checkoutHandler={this.checkoutHandler}
                addToCartHandler={this.addToCartHandler}
                removeFromCartHandler={this.removeFromCartHandler}
                user={this.state.user}
                cart={this.state.cart}
                status="BUILDING"
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      return <EmptyCart />;
    }
  }
}

export { MyCart };
