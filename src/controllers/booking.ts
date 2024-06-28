import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { Booking } from "../modals/booking";
import { invalidateCache } from "../utils/features";
import { myCache } from "../app";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, status, turfInfo, bookingInfo, total } = req.body;

    if (!userId || !status || !turfInfo || !bookingInfo || !total)
      return next(new ErrorHandler("Please enter all the field", 400));

    const booking = await Booking.create({
      userId,
      status,
      turfInfo,
      bookingInfo,
      total,
    });

    await invalidateCache({ booking: true });

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

    await invalidateCache({
      booking: true,
      bookingId: String(`getBooking-${booking._id}`),
    });

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

    let booking;

    if (myCache.has(`getBooking-${id}`)) {
      booking = JSON.parse(myCache.get(`getBooking-${id}`) as string);
    } else {
      booking = await Booking.findById(id);
      if (!booking) return next(new ErrorHandler("No Booking Found", 401));
      myCache.set(`getBooking-${id}`, JSON.stringify(booking));
    }

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
    let bookings;

    if (myCache.has("getAllBooking")) {
      bookings = JSON.parse(myCache.get("getAllBooking") as string);
    } else {
      bookings = await Booking.find({});
      myCache.set("getAllBooking", JSON.stringify(bookings));
    }

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

// {
//   "userId": "667d136eb1d31d8f370acbd4",
//   "status": "processing",
//   "turfInfo": {
//     "turfName": "A1 Turf",
//     "turfPhoto": "uploads\\6f3eaa8a-2311-487f-a46c-56bfda8054.png",
//     "turfPrice": 1234,
//     "turfId": "667906af044c9bcb757208f0",
//     "slot": {
//       "date": "1970-01-01T00:00:12.222+00:00",
//       "time": {
//         "startTime": "1970-01-01T00:00:12.222+00:00",
//         "endTime": "1970-01-01T00:00:12.222+00:00"
//       }
//     }
//   },
//   "bookingInfo": {
//     "city": "Meerut",
//     "state": "Uttar Pradesh",
//     "country": "India",
//     "pinCode": 250001
//   },
//   "total": 55
// }
