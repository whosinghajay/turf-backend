import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../modals/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const user = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new Error(); //to throw error and moves to catch block
    const { phoneNumber, gender, fullName, location, role } = req.body;

    //finding user using phone number
    let user = await User.findOne({ phoneNumber });

    //if user already there
    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${user?.fullName}`,
        user,
      });
    }

    //empty field error
    if (!phoneNumber || !gender || !fullName || !location || !role) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    //creating user
    user = await User.create({ phoneNumber, gender, fullName, location, role });

    await invalidateCache({ user: true });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user?.fullName}`,
      user,
    });
  }
);

export const getAllUser = TryCatch(async (req, res, next) => {
  let user;
  if (myCache.has("getAllUser")) {
    user = JSON.parse(myCache.get("getAllUser") as string);
  } else {
    user = await User.find({});
    myCache.set("getAllUser", JSON.stringify(user));
  }
  return res.status(200).json({
    success: true,
    total: user.length,
    user,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  let user;

  if (myCache.has(`getUser-${id}`)) {
    user = JSON.parse(myCache.get(`getUser-${id}`) as string);
  } else {
    user = await User.findById(id);
    if (!user) next(new ErrorHandler("Invalid Id", 400));
    myCache.set(`getUser-${id}`, JSON.stringify(user));
  }

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

  await invalidateCache({ user: true, userId: String(user._id) });

  return res.status(200).json({
    success: true,
    message: "User deleted Successfully!",
  });
});
