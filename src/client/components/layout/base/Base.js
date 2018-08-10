import React, { Component } from "react";
import { Nav } from "../nav/Nav";
import { Foot } from "../footer/Footer";

// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min";

class Base extends Component {
  render() {
    return (
      <div>
        <main>
          <Nav />
          <div>{this.props.children}</div>
        </main>
        <div>
          <Foot />
        </div>
      </div>
    );
  }
}

export { Base };
