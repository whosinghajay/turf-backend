import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { Turf } from "../modals/turf";

export const turfCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      image,
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    } = req.body;

    if (
      !image ||
      !turfName ||
      !turfLocation ||
      !services ||
      !courtNumbers ||
      !price ||
      !typeOfCourt
    )
      return next(new ErrorHandler("Please provide all fields", 400));

    let turf = await Turf.create({
      image,
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    });
    console.log("hhhh");

    res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(error);
  }
};
