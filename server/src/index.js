import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "http";
import SocketIO from "socket.io";

import db from "./models";
import connectSocket from "./ws";

const app = express();
const http = Server(app);
const io = SocketIO(http);
const sequelize = db.sequelize;

connectSocket(io, db);

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

setInterval(() => {}, 1000);

// start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  http.listen(PORT, () =>
    console.log(`~~~Express server listening on port ${PORT}~~~`)
  );
});
