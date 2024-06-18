import express from "express";
import "dotenv/config";
import cors from "cors";

import user from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/user", user);

app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`);
});
