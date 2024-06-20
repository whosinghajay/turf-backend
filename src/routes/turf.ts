import express from "express";
import { turfCreate } from "../controllers/turf";

const app = express.Router();

app.post("/", turfCreate);

export default app;
