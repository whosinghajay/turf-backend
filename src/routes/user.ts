import express from "express";
import { otpVerification } from "../controllers/user";

const app = express.Router();

app.post("/otp", otpVerification);

export default app;
