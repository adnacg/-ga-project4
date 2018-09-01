import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Browse.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

const BrandPreview = ({ category, name, img }) => (
  <div className="singleBrandDiv">
    <div className="z-depth-3 catBrandImgDiv">
      <Link to={`/browse/${category}/${name}`}>
        <img src={img} className="catBrandImg" alt="Category" />
      </Link>
    </div>
    <p className="catBrandText">{name.toUpperCase()}</p>
  </div>
);

const CategoryPreview = ({ name, children }) => {
  return (
    <div>
      <p className="browseCatTitle">{name.toUpperCase()}</p>
      <div className="brandsDiv">{children}</div>
      <Link
        to={`/browse/${name}`}
        className="waves-effect waves-light btn orderActionBtn centerBtn"
      >
        SEE MORE
      </Link>
      <div className="browseSeparator" />
    </div>
  );
};

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      // items: []
      items: {
        chocolate: [],
        candy: [],
        biscuit: []
      }
    };
  }

  fetchBrands = () => {
    Object.keys(this.state.items).forEach(async category => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/brand?category=${category}`
        );

        const { success, brandsList } = await response.json();
        if (!success) throw new Error(`Failed to fetch brands for ${category}`);
        this.setState(({ items }) => {
          items[category] = brandsList;
          return { items };
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentDidMount = () => {
    this.fetchBrands();
  };

  render() {
    const brands = Object.keys(this.state.items).map(category => (
      <CategoryPreview name={category}>
        {this.state.items[category].map(item => (
          <BrandPreview
            category={category}
            name={item.name}
            img={item.img}
            alt={"Brand preview"}
          />
        ))}
      </CategoryPreview>
    ));

    return (
      <div>
        <div className="browseBanner">
          <div className="browseImgDiv">
            <img src="/feature.png" className="browseImg" />
          </div>
          <div className="browseText">
            <h3>LATEST ARRIVAL</h3>
            <img src="/loackerlogo.jpg" className="z-depth-3 logoFeature" />
            <br />
            <Link
              to="/browse/chocolate/loacker"
              className="waves-effect waves-light btn orderNowBtn orderActionBtn"
            >
              ORDER NOW
            </Link>
          </div>
        </div>

        <div>
          {brands.length > 0 ? (
            brands
          ) : (
            <div>No items to display at the moment.</div>
          )}
        </div>

        <p className="browseCatTitle">MORE OPTIONS</p>
        <div className="moreCatDiv">
          <div className="browseCat">
            <Link
              to="/browse/cookie"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              COOKIE
            </Link>
            <Link
              to="/browse/mint"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              MINT
            </Link>
            <Link
              to="/browse/cracker"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              CRACKER
            </Link>
          </div>
          <div className="browseCat">
            <Link
              to="/browse/gummy"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              GUMMY
            </Link>
            <Link
              to="/browse/savoury"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              SAVOURY
            </Link>
            <Link
              to="/browse/beverage"
              className="waves-effect waves-light btn orderActionBtn catBtn"
            >
              BEVERAGE
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export { Browse };
