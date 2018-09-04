import express from "express";
import createApiControllers from "../controllers/api";

const createApiRouter = db => {
  const router = express.Router();
  const ac = createApiControllers(db);

  router.post("/order/:id/dispatch", ac.dispatchRobot);
  router.get("/order/:id", ac.getOrderUser);
  router.post("/user/:id/update", ac.profileUpdate);
  router.delete("/user/:id/product/:product_id", ac.removeFromCart);
  router.delete("/user/:id/product", ac.clearCart);
  router.post("/user/:id/product", ac.addToCart);
  router.get("/user/:id/product", ac.getCart);
  router.post("/user/:id/order", ac.createOrder);
  router.get("/user/:id/orders", ac.getOrders);
  router.get("/user/:id/order", ac.getActiveOrder);
  router.get("/user/:id", ac.getUser);
  router.get("/orders", ac.orderRead);
  router.get("/product", ac.productRead);
  router.get("/brand", ac.brandRead);

  return router;
};

export default createApiRouter;
