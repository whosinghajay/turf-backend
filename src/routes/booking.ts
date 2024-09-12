import express from "express";
import {
  cancelBooking,
  //   changeTime,
  createBooking,
  getAllBooking,
  getBooking,
  updateBooking,
} from "../controllers/booking.js";
import { userOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/create", createBooking);
app.delete("/:id", cancelBooking);
// app.put("/:id", userOnly, changeTime);
app.get("/all", getAllBooking);
app.get("/:id", getBooking);
app.put('/:id', updateBooking);

export default app;
