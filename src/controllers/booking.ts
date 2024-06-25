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

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) return next(new ErrorHandler("No turf found for this id", 401));

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) return next(new ErrorHandler("No turf found", 400));

    return res.status(201).json({
      success: true,
      message: `Booking Canceled`,
      booking,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

// export const changeTime = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;

//     const booking = await Booking.findById(id);

//     // const startTime = booking!.turfInfo![0]!.slot!.time!.startTime as Date;
//     // const endTime = booking!.turfInfo![0]!.slot!.time!.endTime as Date;

//     if (booking!.turfInfo![0]!.slot!.time!.startTime as Date) {
//       booking!.turfInfo![0]!.slot!.time!.startTime = req.body.startTime;
//       booking!.turfInfo![0]!.slot!.time!.endTime = req.body.endTime;
//     }

//     await booking?.save();

//     return res.status(201).json({
//       success: true,
//       message: "Updated time successfully",
//       booking,
//     });
//   } catch (error) {
//     next(ErrorHandler);
//   }
// };

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) return next(new ErrorHandler("Invalid Id", 401));

    const booking = await Booking.findById(id);

    if (!booking) return next(new ErrorHandler("No Booking Found", 401));

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

export const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find({});

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
