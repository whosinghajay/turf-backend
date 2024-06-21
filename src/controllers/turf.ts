import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { Turf } from "../modals/turf";
import { rm } from "fs";

export const createTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    } = req.body;

    const image = req.file;

    if (!image) return next(new ErrorHandler("Please Add Photo", 400));

    if (
      !turfName ||
      !turfLocation ||
      !services ||
      !courtNumbers ||
      !price ||
      !typeOfCourt
    ) {
      rm(image.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    let turf = await Turf.create({
      image: image.path,
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    });

    res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(error);
  }
};

export const getTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id)

    const turf = await Turf.findById(id);

    if (!turf) return new ErrorHandler("Invalid Turf", 400);

    return res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

export const deleteTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const turf = await Turf.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Turf ${turf?.turfName} deleted Successfully!`,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

export const updateTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const {
      image,
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    } = req.body;

    const turf = await Turf.findById(id);

    if (!turf) return next(new ErrorHandler("Turf Not Found", 404));

    if (image) turf.image = image;
    if (turfName) turf.turfName = turfName;
    if (turfLocation) turf.turfLocation = turfLocation;
    if (services) turf.services = services;
    if (courtNumbers) turf.courtNumbers = courtNumbers;
    if (price) turf.price = price;
    if (typeOfCourt) turf.typeOfCourt = typeOfCourt;

    await turf.save();

    return res.status(201).json({
      success: true,
      message: `Successfully updated the turf ${turf?.turfName}`,
      turf,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
