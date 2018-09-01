import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Category.css";
import auth from "../../utils/auth";
const fetch = auth.authFetch;

class Category extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  fetchBrands = async props => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/brand?category=${
          props.match.params.category
        }`
      );
      const { success, brandsList } = await response.json();
      if (!success) return;
      this.setState({ items: brandsList });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchBrands(this.props);
  };

  componentWillReceiveProps = newProps => this.fetchBrands(newProps);

  render() {
    const itemPreviews = this.state.items.map(item => (
      <div className="catBrandDiv">
        <div className="z-depth-3 catBrandImgDiv">
          <Link to={`/browse/${this.props.match.params.category}/${item.name}`}>
            <img src={item.img} className="catBrandImg" />
          </Link>
        </div>
        <p className="catBrandText">{item.name.toUpperCase()}</p>
      </div>
    ));

    return (
      <div>
        <p className="catTitle">
          {this.props.match.params.category.toUpperCase()}
        </p>
        <div className="mainCatDiv">
          {itemPreviews.length > 0 ? (
            itemPreviews
          ) : (
            <div>No items to display at the moment.</div>
          )}
        </div>
      </div>
    );
  }
}

export { Category };
