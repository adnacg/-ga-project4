import React, { Component } from "react";

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
          <a className="waves-effect waves-light btn orderNowBtn">ORDER NOW</a>
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
          <a class="waves-effect waves-light btn orderNowBtn catBtn">COOKIE</a>
          <a class="waves-effect waves-light btn orderNowBtn catBtn">MINT</a>
          <a class="waves-effect waves-light btn orderNowBtn catBtn">CRACKER</a>
          <a class="waves-effect waves-light btn orderNowBtn catBtn">GUMMY</a>
          <a class="waves-effect waves-light btn orderNowBtn catBtn">SAVOURY</a>
          <a class="waves-effect waves-light btn orderNowBtn catBtn">
            BEVERAGE
          </a>
        </div>
      </div>
    );
  }
}

export { Browse };
