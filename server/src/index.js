import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";

const app = express();
const sequelize = db.sequelize;
const User = db.User;
// import createApiRouter from "./routes/api";
// const api = createApiRouter(db);

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
// app.use("/api", api);

app.get("/", (req, res) =>
  res.send("This is my Express server, nothing to show at root.")
);

// start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log("Test test test");
  User.findAll().then(users => console.log(users));
  app.listen(PORT, () =>
    console.log(`~~~Express server listening on port ${PORT}~~~`)
  );
});
