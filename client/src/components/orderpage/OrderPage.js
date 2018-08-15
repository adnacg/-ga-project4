import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./OrderPage.css";

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

  clickHandler = async (userId, product) => {
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
          cart: [...cart, { name: product.name, price: product.price }]
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const productPreviews = this.state.products.map(product => (
      <div className="productDiv">
        <div className="z-depth-3 productImgDiv">
          <img src={product.img} className="productImg" />
        </div>
        <p className="productDesc">{product.name.toUpperCase()}</p>
        <p className="productPrice">$ {product.price}</p>
        {/* <div className="addToOrderBtnDiv">
          <a className="btn-floating btn waves-effect waves-light addToOrderBtn">
            <i className="material-icons addToOrderIcon">remove</i>
          </a>
          <p>0</p>
          <a className="btn-floating btn waves-effect waves-light addToOrderBtn">
            <i className="material-icons addToOrderIcon">add</i>
          </a>
        </div> */}
        <a
          onClick={() => this.clickHandler(1, product)}
          className="btn-floating btn waves-effect waves-light addToOrderBtn"
        >
          <i className="material-icons addToOrderIcon">add</i>
        </a>
      </div>
    ));

    return (
      <div>
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
            <Cart cart={this.state.cart} user={this.state.user} />
          </Col>
        </Row>
      </div>
    );
  }
}

export { OrderPage };
