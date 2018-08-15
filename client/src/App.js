import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import { Switch, Route } from "react-router-dom";
import { Base } from "./components/layout/base/Base";
import { Home } from "./components/home/Home";
import { Signin } from "./components/signin/Signin";
import { Register } from "./components/register/Register";
import { Profile } from "./components/profile/Profile";
import { AdminSignin } from "./components/adminsignin/AdminSignin";
import { Browse } from "./components/browse/Browse";
import { Category } from "./components/category/Category";
import { OrderPage } from "./components/orderpage/OrderPage";
import { MyCart } from "./components/mycart/MyCart";
import { MyOrder } from "./components/myorder/MyOrder";
import { Orders } from "./components/orders/Orders";
import { AdminOrders } from "./components/adminorders/AdminOrders";
import { ControlPanel } from "./components/controlpanel/ControlPanel";

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
              <Route path="/profile" component={Profile} />
              <Route path="/browse/:category/:brand" component={OrderPage} />
              <Route path="/browse/:category" component={Category} />
              <Route path="/browse" component={Browse} />
              <Route path="/mycart" component={MyCart} />
              <Route path="/myorder" component={MyOrder} />
              <Route path="/orders" component={Orders} />
              <Route path="/admin/orders" component={AdminOrders} />
              <Route path="/admin/control" component={ControlPanel} />
            </Switch>
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
