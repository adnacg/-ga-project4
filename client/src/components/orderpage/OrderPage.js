import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./OrderPage.css";

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      brandItems: []
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/brand?brand=${this.props.match.params.brand}`
      );
      const data = await response.json();
      this.setState({ brandItems: data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const itemPreviews = this.state.brandItems.map(item => (
      <div className="productDiv">
        <div className="z-depth-3 productImgDiv">
          <img src={item.img} className="productImg" />
        </div>
        <p className="productDesc">{item.name}</p>
        <p className="productPrice">$ {item.price}</p>
        <div className="addToOrderBtnDiv">
          <a className="btn-floating btn waves-effect waves-light addToOrderBtn">
            <i className="material-icons addToOrderIcon">remove</i>
          </a>
          <p>0</p>
          <a className="btn-floating btn waves-effect waves-light addToOrderBtn">
            <i className="material-icons addToOrderIcon">add</i>
          </a>
        </div>
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
              {itemPreviews.length > 0 ? (
                itemPreviews
              ) : (
                <div>No items to display at the moment.</div>
              )}
            </div>
          </Col>

          <Col s={4} m={4}>
            <Cart />
          </Col>
        </Row>
      </div>
    );
  }
}

export { OrderPage };
