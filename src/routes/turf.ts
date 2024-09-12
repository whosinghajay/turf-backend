import express from "express";
import {
  createTurf,
  deleteTurf,
  getAllTurf,
  getAllTypes,
  getTurf,
  getlatestTurf,
  updateTurf,
} from "../controllers/turf";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly, turfPosterOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/create",singleUpload, createTurf);
// app.get("/all", adminOnly, getAllTurf);
app.get("/all", getAllTurf);
app.get("/category", adminOnly, getAllTypes);
app.get("/latest", getlatestTurf); //why??
app.get("/:id", getTurf);
app.delete("/:id", deleteTurf);
app.put("/:id", singleUpload, updateTurf);

export default app;
