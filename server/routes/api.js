import express from "express";
import { log } from "util";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log(req.query);

  res.json([
    // { title: "Hello World", thumbnailUrl: "example.com" },
    { title: "Hello World3", thumbnailUrl: "example.com" },
    { title: "Hello World2", thumbnailUrl: "example.com" }
  ]);
});

export default router;
