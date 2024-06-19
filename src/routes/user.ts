import express from "express";
import { deleteUser, getAllUser, getUser, user } from "../controllers/user";

const app = express.Router();

app.post("/", user);
app.get("/all", getAllUser);
app.get("/:id", getUser);
app.delete("/:id", deleteUser);

export default app;
