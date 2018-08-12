import React, { Component } from "react";

import "./Category.css";

class Category extends Component {
  render() {
    return (
      <div>
        <p className="catTitle">CHOCOLATE</p>

        <div className="mainCatDiv">
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND ONE</p>
          </div>
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND TWO</p>
          </div>
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND THREE</p>
          </div>
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND FOUR</p>
          </div>
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND FIVE</p>
          </div>
          <div className="catBrandDiv">
            <div className="z-depth-3">
              <img src="/financier.png" className="catBrandImg" />
            </div>
            <p className="catBrandText">BRAND SIX</p>
          </div>
        </div>
      </div>
    );
  }
}

export { Category };
