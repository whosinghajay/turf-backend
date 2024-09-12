import express from "express";
import { deleteUser, getAllUser, getUser, user } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/create", user);
app.get("/all", getAllUser);
app.get("/:id", getUser);
app.delete("/:id", deleteUser);

export default app;
