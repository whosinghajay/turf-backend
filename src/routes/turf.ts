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

const app = express.Router();

app.post("/create", singleUpload, createTurf);
app.get("/all", getAllTurf);
app.get("/category", getAllTypes);
app.get("/latest", getlatestTurf);
app.get("/:id", getTurf);
app.delete("/:id", deleteTurf);
app.put("/:id", singleUpload, updateTurf);

export default app;
