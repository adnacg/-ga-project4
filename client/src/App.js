import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import { Switch, Route } from "react-router-dom";
import { Base } from "./components/layout/base/Base";
import { Home } from "./components/home/Home";
import { Signin } from "./components/signin/Signin";
import { Register } from "./components/register/Register";
import { AdminSignin } from "./components/adminsignin/AdminSignin";
import { Browse } from "./components/browse/Browse";
import { Category } from "./components/category/Category";
import { OrderPage } from "./components/orderpage/OrderPage";
import { Cart } from "./components/cart/Cart";
import { EmptyCart } from "./components/emptycart/EmptyCart";
import { Orders } from "./components/orders/Orders";
import { ControlPanel } from "./components/controlpanel/ControlPanel";

// cart
// order history page
// track order
// profile
// admin dashboard

class App extends Component {
  render() {
    return (
      <Base>
        <Row>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin/admin" component={AdminSignin} />
              <Route path="/signin" component={Signin} />
              <Route path="/register" component={Register} />
              <Route
                path="/browse/:category/:brand/order"
                component={OrderPage}
              />
              <Route path="/browse/:category" component={Category} />
              <Route path="/browse" component={Browse} />
              <Route path="/orders" component={Orders} />
              <Route path="/admin/control" component={ControlPanel} />
            </Switch>
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
