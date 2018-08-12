import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import { Cart } from "../cart/Cart";

import "./OrderPage.css";

class OrderPage extends Component {
  render() {
    return (
      <div>
        <p className="orderTitle">BRAND NAME</p>
        <Row>
          <Col s={8} m={8}>
            <div className="mainOrderDiv">
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
              <div className="productDiv">
                <div className="z-depth-3 productImgDiv">
                  <img src="/financier.png" className="productImg" />
                </div>
                <p className="productDesc">Hazelnut Quadratini Mini 125g</p>
                <p className="productPrice">$ 3.95</p>
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
