import express from "express";
import {
  cancelBooking,
  //   changeTime,
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/booking";
import { userOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/create", createBooking);
app.delete("/:id", cancelBooking);
// app.put("/:id", userOnly, changeTime);
app.get("/all", getAllBooking);
app.get("/:id", getBooking);

export default app;
