import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { Booking } from "../modals/booking";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, status, turfInfo, bookingInfo, total } = req.body;

    if (!user || !status || !turfInfo || !bookingInfo || !total)
      return next(new ErrorHandler("Please enter all the field", 400));

    const booking = await Booking.create({
      user,
      status,
      turfInfo,
      bookingInfo,
      total,
    });

    return res.status(201).json({
      success: true,
      message: "Booking done successfully",
      booking,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
