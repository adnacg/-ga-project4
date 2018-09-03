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
      user: {},
      currentOrderContent: null,
      currentOrderStatus: "",
      loading: true
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
      const { success, productList } = await response.json();
      if (!success) return;
      this.setState({ products: productList });
    } catch (error) {
      console.log(error);
    }

    // Get current user
    const userId = auth.getUserId();
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
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/order`
      );
      const { success, orderStatus, orderProducts } = await response.json();

      if (!success) return;
      this.setState({
        currentOrderStatus: orderStatus,
        currentOrderContent: orderProducts
      });
    } catch (error) {
      console.log(error);
    }

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

    // Send clear cart request to backend
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${userId}/product`,
        {
          method: "DELETE"
        }
      );
      const { success } = await response.json();
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

    const productPreviews = this.state.products.map(product => (
      <div className="productDiv">
        <div className="z-depth-3 productImgDiv">
          <img src={product.img} className="productImg" />
          {this.state.currentOrderContent ? (
            <div />
          ) : (
            <a
              onClick={() =>
                this.addToCartHandler(this.state.user.id, product.id)
              }
              className="btn-floating btn waves-effect waves-light z-depth-5 addToOrderBtn"
            >
              <i className="material-icons addToOrderIcon">add</i>
            </a>
          )}
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
              {this.state.currentOrderContent ? (
                <Cart
                  cart={this.state.currentOrderContent}
                  user={this.state.user}
                  status={this.state.currentOrderStatus}
                />
              ) : (
                <Cart
                  status="BUILDING"
                  cart={this.state.cart}
                  user={this.state.user}
                  addToCartHandler={this.addToCartHandler}
                  removeFromCartHandler={this.removeFromCartHandler}
                  checkoutHandler={this.checkoutHandler}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export { OrderPage };
