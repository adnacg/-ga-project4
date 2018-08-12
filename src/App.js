import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import { Base } from "./client/components/layout/base/Base";
import { Home } from "./client/components/home/Home";
import { Signin } from "./client/components/signin/Signin";
import { Register } from "./client/components/register/Register";
import { AdminSignin } from "./client/components/adminsignin/AdminSignin";
import { Browse } from "./client/components/browse/Browse";
import { Category } from "./client/components/category/Category";
import { OrderPage } from "./client/components/orderpage/OrderPage";
import { Cart } from "./client/components/cart/Cart";
import { EmptyCart } from "./client/components/emptycart/EmptyCart";
import { Orders } from "./client/components/orders/Orders";
import { ControlPanel } from "./client/components/controlpanel/ControlPanel";

class App extends Component {
  render() {
    return (
      <Base>
        <Row>
          <Container>
            <OrderPage />
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
