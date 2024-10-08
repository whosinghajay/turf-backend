import { NextFunction, Request, Response } from "express";
import { User } from "../modals/user.js";
import ErrorHandler from "../utils/utility-class.js";

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("You have to login first", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("No user found", 401));

  if (user.role !== "admin")
    return next(
      new ErrorHandler("You've to be admin in order to access it", 401)
    );

  next();
};

export const turfPosterOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("You have to login first", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("No user found", 401));

  if (user.role !== "turfPoster")
    return next(
      new ErrorHandler("You've to be turfPoster in order to access it", 401)
    );

  next();
};

export const userOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler("You have to login first", 401));

    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("No user found", 401));

    if (user.role !== "user")
      return next(
        new ErrorHandler("You have to be user in order to book a turf", 401)
      );

    next();
  } catch (error) {
    next(ErrorHandler);
  }
};
