import { NextFunction, Request, Response } from "express";
import { myCache } from "../app";
import ErrorHandler from "../utils/utility-class";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let stats;
  try {
    if (myCache.has("admin-stats")) {
      stats = JSON.parse(myCache.get("admin-stats") as string);
    }else{

    }
  } catch (error) {
    next(ErrorHandler);
  }
};
