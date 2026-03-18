import express from "express";
import { getPlots } from "../controllers/getPlots.js";
import { savePlot } from "../controllers/savePlot.js";
import { deletePlot } from "../controllers/deletePlot.js";

const router = express.Router();


router.get("/api/plots", getPlots);

router.post("/api/plots", savePlot);

router.delete("/api/plots/:id", deletePlot);

export default router;