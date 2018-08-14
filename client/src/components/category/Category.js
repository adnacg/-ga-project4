import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Category.css";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/category?category=${
          this.props.match.params.category
        }`
      );
      const data = await response.json();
      this.setState({ items: data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const itemPreviews = this.state.items.map(item => (
      <div className="catBrandDiv">
        <div className="z-depth-3 catBrandImgDiv">
          <Link to="/browse/chocolate/loacker/order">
            <img src={item.img} className="catBrandImg" />
          </Link>
        </div>
        <p className="catBrandText">{item.name}</p>
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
