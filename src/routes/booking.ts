import express from "express";
import { createBooking } from "../controllers/booking";
import { userOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/create", userOnly, createBooking);

export default app;
