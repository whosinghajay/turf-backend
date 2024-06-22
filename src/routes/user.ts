import express from "express";
import { deleteUser, getAllUser, getUser, user } from "../controllers/user";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/create", user);
app.get("/all", adminOnly, getAllUser);
app.get("/:id", getUser);
app.delete("/:id", deleteUser);

export default app;
