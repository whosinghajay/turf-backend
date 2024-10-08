import cors from "cors";
import "dotenv/config";
import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import "./utils/scheduler.js"
import "./utils/serverAwake.js"

//importing routes
import booking from "./routes/booking.js";
import turf from "./routes/turf.js";
import user from "./routes/user.js";
import dashboard from "./routes/stats.js";
import otp from './routes/otp.js';

import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

//database connection
connectDB();

//node cache
export const myCache = new NodeCache();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
//This is used to set up middleware for logging HTTP requests
app.use(morgan("dev"));

app.use(cors());

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/turf", turf);
app.use("/api/v1/booking", booking);
app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/otp", otp);

//used this middleware for multer
app.use("/uploads", express.static("uploads"));

//error middleware
app.use(errorMiddleware);

//server connection
app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`);
});
