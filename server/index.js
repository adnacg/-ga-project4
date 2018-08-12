import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import cors from "cors";

const app = express();

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
app.use("/api", router);

app.get("/", (req, res) => res.send("Hello World!"));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`~~~Express server listening on port ${PORT}~~~`)
);
