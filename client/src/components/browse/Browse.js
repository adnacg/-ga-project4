import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Browse.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  fetchBrands = async props => {
    try {
      console.log("Before request");
      const response = await fetch(
        `http://localhost:5000/api/brand?category=chocolate`
      );
      console.log(response);

      const data = await response.json();
      this.setState({ items: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchBrands(this.props);
  };

  render() {
    const itemPreviews = this.state.items.map(item => (
      <div className="catBrandDiv">
        <div className="z-depth-3 catBrandImgDiv">
          <Link to={`/browse/chocolate/${item.name}`}>
            <img src={item.img} className="catBrandImg" />
          </Link>
        </div>
        <p className="catBrandText">{item.name.toUpperCase()}</p>
      </div>
    ));
    return (
      <div>
        <div className="browseImg">
          <img src="/financier.png" className="browseImg" />
        </div>
        <div className="browseText">
          <h3 className="headerTitle">LATEST ARRIVAL</h3>
          <Link
            to="/browse/chocolate/loacker"
            className="waves-effect waves-light btn orderNowBtn"
          >
            ORDER NOW
          </Link>
        </div>

        <p className="browseCatTitle">OUR TOP PICKS</p>

        <div className="mainCatDiv">
          {itemPreviews.length > 0 ? (
            itemPreviews
          ) : (
            <div>No items to display at the moment.</div>
          )}
        </div>

        {/*<div className="browseCat">
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND ONE</p>
          </div>
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND TWO</p>
          </div>
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND THREE</p>
          </div>
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND FOUR</p>
          </div>
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND FIVE</p>
          </div>
          <div className="brandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="brandImg" />
            </div>
            <p className="brandText">BRAND SIX</p>
          </div>
        </div> */}
        <div className="browseSeparator" />
        <a class="waves-effect waves-light btn orderNowBtn">SEE MORE</a>

        <p className="browseCatTitle">MORE OPTIONS</p>
        <div className="browseCat">
          <Link
            to="/browse/cookie"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            COOKIE
          </Link>
          <Link
            to="/browse/mint"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            MINT
          </Link>
          <Link
            to="/browse/cracker"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            CRACKER
          </Link>
        </div>
        <div className="browseCat">
          <Link
            to="/browse/gummy"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            GUMMY
          </Link>
          <Link
            to="/browse/savoury"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            SAVOURY
          </Link>
          <Link
            to="/browse/beverage"
            class="waves-effect waves-light btn orderNowBtn catBtn"
          >
            BEVERAGE
          </Link>
        </div>
      </div>
    );
  }
}

export { Browse };
