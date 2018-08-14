import express from "express";
import createApiControllers from "../controllers/api";

const createApiRouter = db => {
  const router = express.Router();
  const ac = createApiControllers(db);

  router.get("/category", ac.categoryRead);
  router.get("/brand", ac.brandRead);

  return router;
};

export default createApiRouter;
