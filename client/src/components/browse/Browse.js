import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Browse.css";

class Browse extends Component {
  render() {
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

        <div className="browseCat">
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
        </div>
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
