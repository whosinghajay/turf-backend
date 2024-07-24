import { NextFunction, Request, Response } from "express";
import { rm } from "fs";
import { Turf } from "../modals/turf";
import ErrorHandler from "../utils/utility-class";
import { myCache } from "../app";
import { invalidateCache } from "../utils/features";

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

    // Initialize slots
    const slots = [];
    for (let i = 1; i <= courtNumbers; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date();
        date.setDate(date.getDate() + j);
        days.push({
          date,
          slots: [
            { time: "00:00", booked: false },
            { time: "01:00", booked: false },
            { time: "02:00", booked: false },
            { time: "03:00", booked: false },
            { time: "04:00", booked: false },
            { time: "05:00", booked: false },
            { time: "06:00", booked: false },
            { time: "07:00", booked: false },
            { time: "08:00", booked: false },
            { time: "09:00", booked: false },
            { time: "10:00", booked: false },
            { time: "11:00", booked: false },
            { time: "12:00", booked: false },
            { time: "13:00", booked: false },
            { time: "14:00", booked: false },
            { time: "15:00", booked: false },
            { time: "16:00", booked: false },
            { time: "17:00", booked: false },
            { time: "18:00", booked: false },
            { time: "19:00", booked: false },
            { time: "20:00", booked: false },
            { time: "21:00", booked: false },
            { time: "22:00", booked: false },
            { time: "23:00", booked: false },
          ],
        });
      }
      slots.push({ courtNumber: i, days });
    }

    let turf = await Turf.create({
      image: image.path,
      turfName,
      turfLocation,
      services,
      slot: slots,
      courtNumbers,
      price,
      typeOfCourt,
    });

    await invalidateCache({ turf: true });

    res.status(201).json({
      success: true,
      turf,
    });
  } catch (error) {
    next(new ErrorHandler((error as Error).message, 500));
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
      if (!turf) return next(new ErrorHandler("Invalid Turf", 400));
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

    if (!turf) return next(new ErrorHandler("Turf not found", 400));

    rm(turf?.image!, () => {
      console.log("image deleted successfully");
    });

    await turf.deleteOne();

    await invalidateCache({ turf: true, turfId: String(turf._id) });

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
      comments,
      services,
      courtNumbers,
      price,
      slot,
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
    // if (slot) turf.slot = slot;
    if (slot && Array.isArray(slot)) {
      turf.slot.push(...slot);
    }
    if (comments) turf.comments = comments;

    await turf.save();

    await invalidateCache({ turf: true, turfId: String(turf._id) });

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

//why do i need this?
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
