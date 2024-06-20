import express from "express";
import { deleteTurf, turfCreate, updateTurf } from "../controllers/turf";

const app = express.Router();

app.post("/", turfCreate);
app.delete("/:id", deleteTurf);
app.put("/:id", updateTurf);

export default app;
