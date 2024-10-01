import express, { Request, Response } from "express";
import { generateOTP, sendOTP } from "../utils/otpUtils";
import { myCache } from "../app"; // Ensure you're importing myCache correctly
import { log } from "console";

const router = express.Router();

// Route to request an OTP
router.post("/request-otp", async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    console.log("phone number is missing");
    return res.status(400).json({ message: "Phone number is required" });
  }

  const otp = generateOTP();
  console.log(otp);

  try {
    await sendOTP(phoneNumber, otp);
    // Storing OTP in cache with a short expiration time (e.g., 5 minutes)
    myCache.set(phoneNumber, otp, 300); // Cache for 5 minutes
    console.log("OTP sent successfully");
    return res.status(200).json({ message: "OTP sent successfully", otp: otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Route to verify the OTP
router.post("/verify-otp", (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  const cachedOtp = myCache.get(phoneNumber);

  if (!cachedOtp) {
    return res.status(400).json({ message: "OTP has expired or not sent" });
  }

  if (cachedOtp === otp) {
    myCache.del(phoneNumber); // Remove OTP from cache after successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

export default router;
