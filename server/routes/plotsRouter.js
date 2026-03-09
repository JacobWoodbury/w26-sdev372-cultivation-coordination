import express from "express";

const router = express.Router();

let plots = [];
let id = 1;

router.post("/api/plots", (req, res) => {
  const plot = { id: id++, ...req.body };
  plots.push(plot);
  res.status(201).json(plot);
});

router.get("/api/plots", (req, res) => {
  res.status(200).json(plots);
});

export default router;