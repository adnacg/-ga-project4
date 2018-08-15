import express from "express";
import createApiControllers from "../controllers/api";

const createApiRouter = db => {
  const router = express.Router();
  const ac = createApiControllers(db);

  router.post("/user/:id/product", ac.addToCart);
  router.get("/user/:id/product", ac.getCart);
  router.get("/user/:id", ac.getUser);
  router.get("/product", ac.productRead);
  router.get("/brand", ac.brandRead);

  return router;
};

export default createApiRouter;
