"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooking = exports.getBooking = exports.cancelBooking = exports.createBooking = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const booking_1 = require("../modals/booking");
const features_1 = require("../utils/features");
const app_1 = require("../app");
const createBooking = async (req, res, next) => {
    try {
        const { userId, status, turfInfo, bookingInfo, total } = req.body;
        if (!userId || !status || !turfInfo || !bookingInfo || !total)
            return next(new utility_class_1.default("Please enter all the field", 400));
        const booking = await booking_1.Booking.create({
            userId,
            status,
            turfInfo,
            bookingInfo,
            total,
        });
        await (0, features_1.invalidateCache)({ booking: true });
        return res.status(201).json({
            success: true,
            message: "Booking done successfully",
            booking,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.createBooking = createBooking;
const cancelBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            return next(new utility_class_1.default("No turf found for this id", 401));
        const booking = await booking_1.Booking.findByIdAndDelete(id);
        if (!booking)
            return next(new utility_class_1.default("No turf found", 400));
        await (0, features_1.invalidateCache)({
            booking: true,
            bookingId: String(`getBooking-${booking._id}`),
        });
        return res.status(201).json({
            success: true,
            message: `Booking Canceled`,
            booking,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.cancelBooking = cancelBooking;
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
const getBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            return next(new utility_class_1.default("Invalid Id", 401));
        let booking;
        if (app_1.myCache.has(`getBooking-${id}`)) {
            booking = JSON.parse(app_1.myCache.get(`getBooking-${id}`));
        }
        else {
            booking = await booking_1.Booking.findById(id);
            if (!booking)
                return next(new utility_class_1.default("No Booking Found", 401));
            app_1.myCache.set(`getBooking-${id}`, JSON.stringify(booking));
        }
        return res.status(200).json({
            success: true,
            booking,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getBooking = getBooking;
const getAllBooking = async (req, res, next) => {
    try {
        let bookings;
        if (app_1.myCache.has("getAllBooking")) {
            bookings = JSON.parse(app_1.myCache.get("getAllBooking"));
        }
        else {
            bookings = await booking_1.Booking.find({});
            app_1.myCache.set("getAllBooking", JSON.stringify(bookings));
        }
        return res.status(200).json({
            success: true,
            bookings,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getAllBooking = getAllBooking;
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
