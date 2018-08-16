import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";
import { EmptyCart } from "../emptycart/EmptyCart";

import "./MyCart.css";

class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      user: {}
    };
  }

  componentDidMount = async () => {
    // Get current user cart
    if (/* !userLoggedIn() */ false) return;
    const userId = 1;
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`
      );
      const data = await response.json();
      this.setState({ cart: data });
    } catch (error) {
      console.log(error);
    }

    // Get current user
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      this.setState({ user: data });
    } catch (error) {
      console.log(error);
    }
  };

  addToCartHandler = async (userId, product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product?product_id=${
          product.id
        }`,
        {
          method: "POST"
        }
      );
      const { success } = await response.json();
      console.log(success);

      if (success) {
        this.setState(({ cart }) => ({
          cart: [
            ...cart,
            { id: product.id, name: product.name, price: product.price }
          ]
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  removeFromCartHandler = async (userId, product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product?product_id=${
          product.id
        }`,
        {
          method: "DELETE"
        }
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`
      );
      const data = await response.json();
      this.setState({ cart: data });
    } catch (error) {
      console.log(error);
    }
  };

  checkoutHandler = async userId => {
    // Send order creation request to backend
    let success = false;
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/order`,
        {
          method: "POST"
        }
      );
      const feedback = await response.json();
      success = feedback.success;
    } catch (error) {
      console.log(error);
    }

    // Send clear cart request to backend
    if (!success) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`,
        {
          method: "DELETE"
        }
      );
      success = await response.json().success;
    } catch (error) {
      console.log(error);
    }

    // Redirect to track order
    this.props.history.push("/myorder");
  };

  render() {
    if (this.state.cart.length === 0) {
      return <EmptyCart />;
    } else {
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
    }
  }
}

export { MyCart };
