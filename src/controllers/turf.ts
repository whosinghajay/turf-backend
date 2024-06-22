import { NextFunction, Request, Response } from "express";
import { rm } from "fs";
import { Turf } from "../modals/turf";
import ErrorHandler from "../utils/utility-class";
import { myCache } from "../app";

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

    let turf;

    if (myCache.has(`getTurf-${id}`)) {
      turf = JSON.parse(myCache.get(`getTurf-${id}`) as string);
    } else {
      turf = await Turf.findById(id);
      if (!turf) return new ErrorHandler("Invalid Turf", 400);
      myCache.set(`getTurf-${id}`, JSON.stringify(turf));
    }

    return res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

export const getAllTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let turf;
    if (myCache.has("getAllTurf")) {
      turf = JSON.parse(myCache.get("getAllTurf") as string);
    } else {
      turf = await Turf.find({});
      myCache.set("getAllTurf", JSON.stringify(turf));
    }

    return res.status(201).json({
      success: true,
      total: turf.length,
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

    const turf = await Turf.findById(id);

    if (!turf) return new ErrorHandler("Turf not found", 400);

    rm(turf?.image!, () => {
      console.log("image deleted successfully");
    });

    await turf.deleteOne();

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
      turfName,
      turfLocation,
      services,
      courtNumbers,
      price,
      typeOfCourt,
    } = req.body;

    const image = req.file;

    const turf = await Turf.findById(id);

    if (!turf) return next(new ErrorHandler("Turf Not Found", 404));

    if (image) {
      rm(turf.image, () => {
        console.log("previous image deleted and the new one is added");
      });
      turf.image = image.path;
    }
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

export const getAllTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let types;

  if (myCache.has("types")) {
    types = JSON.parse(myCache.get("types") as string);
  } else {
    types = await Turf.distinct("typeOfCourt");
    myCache.set("types", JSON.stringify(types));
  }

  return res.status(200).json({
    success: true,
    total: types.length,
    types,
  });
};

export const getlatestTurf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const turf = await Turf.find({}).sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
