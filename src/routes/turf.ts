import express from "express";
import {
  createTurf,
  deleteTurf,
  getTurf,
  updateTurf,
} from "../controllers/turf";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

app.post("/", singleUpload, createTurf);
app.get("/:id", getTurf);
app.delete("/:id", deleteTurf);
app.put("/:id", singleUpload, updateTurf);

export default app;
