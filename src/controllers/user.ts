import { NextFunction, Request, Response } from "express";
import { User } from "../modals/user";
import { NewUserRequestBody } from "../types/types";

export const otpVerification = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, gender, fullName } = req.body;
    const user = await User.create({phoneNumber, gender, fullName});
    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.fullName}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
