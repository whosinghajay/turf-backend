import express from "express";
import { getDashboardStats, getPieCharts } from "../controllers/stats";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

app.get("/stats", adminOnly, getDashboardStats);
app.get("/pie", adminOnly, getPieCharts);

export default app;
