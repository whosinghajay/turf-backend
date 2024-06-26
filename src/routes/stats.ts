import express from "express";
import { getDashboardStats } from "../controllers/stats";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

app.get("/stats", adminOnly, getDashboardStats);

export default app;
