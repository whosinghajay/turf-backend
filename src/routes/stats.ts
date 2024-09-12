import express from "express";
import { getDashboardStats, getPieCharts } from "../controllers/stats.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.get("/stats", adminOnly, getDashboardStats);
app.get("/pie", adminOnly, getPieCharts);

export default app;
