import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { User } from "../modals/user";
import { NewUserRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";

export const user = TryCatch(
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

    //empty field error
    if (!phoneNumber || !gender || !fullName) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    //creating user
    user = await User.create({ phoneNumber, gender, fullName });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user?.fullName}`,
    });
  }
);

export const getAllUser = TryCatch(async (req, res, next) => {
  const user = await User.find({});
  return res.status(200).json({
    success: true,
    user,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user?.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User deleted Successfully!",
  });
});