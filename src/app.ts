import express from "express";
import "dotenv/config";
import cors from "cors";

import user from "./routes/user.js";
import turf from "./routes/turf.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

const port = process.env.PORT || 3000;

//database connection
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/turf", turf);

//error middleware
app.use(errorMiddleware);

//server connection
app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`);
});
