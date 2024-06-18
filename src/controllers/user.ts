import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { User } from "../modals/user";
import { NewUserRequestBody } from "../types/types";

export const otpVerification = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new Error(); //to throw error and moves to catch block
    const { phoneNumber, gender, fullName } = req.body;

    //finding user using phone number
    let user = await User.findOne({ phoneNumber });

    //if user already there
    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user?.fullName}`,
      });
    }

    //creating user
    user = await User.create({ phoneNumber, gender, fullName });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user?.fullName}`,
    });
  }
);
