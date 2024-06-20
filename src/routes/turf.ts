import express from "express";
import { deleteTurf, turfCreate } from "../controllers/turf";

const app = express.Router();

app.post("/", turfCreate);
app.delete("/:id", deleteTurf);

export default app;
