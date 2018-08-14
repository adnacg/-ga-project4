import express from "express";
import createApiControllers from "../controllers/api";

const createApiRouter = db => {
  const router = express.Router();
  const ac = createApiControllers(db);

  router.get("/test", ac.testRead);

  return router;
};

export default createApiRouter;
