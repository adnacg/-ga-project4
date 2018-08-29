import express from "express";
import createAuthControllers from "../controllers/auth";

const createAuthRouter = db => {
  const router = express.Router();
  const auc = createAuthControllers(db);

  router.post("/login", auc.login);

  return router;
};

export default createAuthRouter;
