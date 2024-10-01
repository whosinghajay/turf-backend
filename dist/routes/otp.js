"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpUtils_1 = require("../utils/otpUtils");
const app_1 = require("../app"); // Ensure you're importing myCache correctly
const router = express_1.default.Router();
// Route to request an OTP
router.post("/request-otp", async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        console.log("phone number is missing");
        return res.status(400).json({ message: "Phone number is required" });
    }
    const otp = (0, otpUtils_1.generateOTP)();
    console.log(otp);
    try {
        await (0, otpUtils_1.sendOTP)(phoneNumber, otp);
        // Storing OTP in cache with a short expiration time (e.g., 5 minutes)
        app_1.myCache.set(phoneNumber, otp, 300); // Cache for 5 minutes
        console.log("OTP sent successfully");
        return res.status(200).json({ message: "OTP sent successfully", otp: otp });
    }
    catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
});
// Route to verify the OTP
router.post("/verify-otp", (req, res) => {
    const { phoneNumber, otp } = req.body;
    const cachedOtp = app_1.myCache.get(phoneNumber);
    if (!cachedOtp) {
        return res.status(400).json({ message: "OTP has expired or not sent" });
    }
    if (cachedOtp === otp) {
        app_1.myCache.del(phoneNumber); // Remove OTP from cache after successful verification
        return res.status(200).json({ message: "OTP verified successfully" });
    }
    else {
        return res.status(400).json({ message: "Invalid OTP" });
    }
});
exports.default = router;
