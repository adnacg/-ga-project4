import React, { Component } from "react";
import { Row, Col, Icon } from "react-materialize";
// import { Cart } from "../cart/Cart";
import { Map } from "../map/Map";

import "./ControlPanel.css";

class ControlPanel extends Component {
  render() {
    return (
      <Map orderId={this.props.match.params.orderId} />

      // <div>
      //   <p className="cpTitle">CONTROL PANEL</p>
      //   <Row>
      //     <Col s={6} m={6}>
      //       <Col s={10} m={10}>
      //         <Cart />
      //       </Col>
      //     </Col>

      //     <Col s={6} m={6} className="mainPanel">
      //       <div>
      //         <p>Change current status</p>
      //         <a className="waves-effect waves-light btn browseActBtn">
      //           Arrived!
      //         </a>
      //       </div>
      //       <div>
      //         <p>Move Snacky</p>
      //         <div className="arrows">
      //           <div className="arrowUp">
      //             <Icon>arrow_drop_up</Icon>
      //           </div>
      //         </div>
      //         <div className="arrows">
      //           <div className="arrowLeft">
      //             <Icon>arrow_left</Icon>
      //           </div>
      //           <div className="emptyArrow" />
      //           <div className="arrowRight">
      //             <Icon>arrow_right</Icon>
      //           </div>
      //         </div>
      //         <div className="arrows">
      //           <div className="arrowDown">
      //             <Icon>arrow_drop_down</Icon>
      //           </div>
      //         </div>
      //       </div>
      //     </Col>
      //   </Row>
      // </div>
    );
  }
}

export { ControlPanel };
