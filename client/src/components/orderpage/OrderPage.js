import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./OrderPage.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      user: {}
    };
  }

  componentDidMount = async () => {
    // Get products to display
    try {
      const response = await fetch(
        `http://localhost:5000/api/product?brand=${
          this.props.match.params.brand
        }&category=${this.props.match.params.category}`
      );
      const data = await response.json();
      this.setState({ products: data });
    } catch (error) {
      console.log(error);
    }

    // Get current user cart
    const userId = auth.getUserId();
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
        `http://localhost:5000/api/user/${userId}/product/${product.id}`,
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
    let orderId;
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/order`,
        {
          method: "POST"
        }
      );
      const feedback = await response.json();
      orderId = feedback.orderId;
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
    const productPreviews = this.state.products.map(product => (
      <div className="productDiv">
        <div className="z-depth-3 productImgDiv">
          <img src={product.img} className="productImg" />
          <a
            onClick={() =>
              this.addToCartHandler(this.state.user.id, {
                id: product.id,
                name: product.name,
                price: product.price
              })
            }
            className="btn-floating btn waves-effect waves-light z-depth-5 addToOrderBtn"
          >
            <i className="material-icons addToOrderIcon">add</i>
          </a>
        </div>
        <p className="productDesc">{product.name.toUpperCase()}</p>
        <p className="productPrice">$ {product.price}</p>
      </div>
    ));

    return (
      <div className="orderPageDisplay">
        <p className="orderTitle">
          {this.props.match.params.brand.toUpperCase()}
        </p>
        <Row>
          <Col s={8} m={8}>
            <div className="mainOrderDiv">
              {productPreviews.length > 0 ? (
                productPreviews
              ) : (
                <div>No products to display at the moment.</div>
              )}
            </div>
          </Col>

          <Col s={4} m={4}>
            <div className="orderpageCart">
              <Cart
                status="BUILDING"
                cart={this.state.cart}
                user={this.state.user}
                addToCartHandler={this.addToCartHandler}
                removeFromCartHandler={this.removeFromCartHandler}
                checkoutHandler={this.checkoutHandler}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export { OrderPage };
