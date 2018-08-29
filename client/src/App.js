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
import { PrivateRoute } from "./components/privateroute/PrivateRoute";

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
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute
                path="/browse/:category/:brand"
                component={OrderPage}
              />
              <PrivateRoute path="/browse/:category" component={Category} />
              <PrivateRoute path="/browse" component={Browse} />
              <PrivateRoute path="/mycart" component={MyCart} />
              <PrivateRoute path="/myorder" component={MyOrder} />
              <PrivateRoute path="/orders" component={Orders} />
              <PrivateRoute
                path="/admin/orders"
                component={AdminOrders}
                allowedRoles={["admin"]}
              />
              <PrivateRoute
                path="/admin/control"
                component={ControlPanel}
                allowedRoles={["admin"]}
              />
            </Switch>
          </Container>
        </Row>
      </Base>
    );
  }
}

export default App;
