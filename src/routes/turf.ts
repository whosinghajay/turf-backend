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
import { singleUpload } from "../middlewares/multer";
import { turfPosterOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/create", turfPosterOnly, singleUpload, createTurf);
app.get("/all", getAllTurf);
app.get("/category", getAllTypes);
app.get("/latest", getlatestTurf);
app.get("/:id", getTurf);
app.delete("/:id", deleteTurf);
app.put("/:id", singleUpload, updateTurf);

export default app;
