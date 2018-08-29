import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";

const app = express();
const sequelize = db.sequelize;

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://192.168.1.23:3000",
      "http://10.193.240.204:3000"
    ],
    credentials: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
import createApiRouter from "./routes/api";
import createAuthRouter from "./routes/auth";
import createAuthCheck from "./middlewares/auth-check";
const apiRoutes = createApiRouter(db);
const authRoutes = createAuthRouter(db);
const authCheck = createAuthCheck(db);
app.use("/api", authCheck, apiRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) =>
  res.send("This is my Express server, nothing to show at root.")
);

// start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`~~~Express server listening on port ${PORT}~~~`)
  );
});
