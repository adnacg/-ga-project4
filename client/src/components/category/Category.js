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
      // const response = await fetch("https://jsonplaceholder.typicode.com/photos");
      // const response = await fetch(`/api/category?search=${this.props.match.params.category}`);
      const response = await fetch(
        `http://localhost:5000/api/test?category=${
          this.props.match.params.category
        }`,
        {
          // credentials: "include"
        }
      );
      const data = await response.json();
      console.log(data);
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
            <img src={item.thumbnailUrl} className="catBrandImg" />
          </Link>
        </div>
        <p className="catBrandText">{item.title}</p>
      </div>
    ));

    return (
      <div>
        <p className="catTitle">CHOCOLATE</p>
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
