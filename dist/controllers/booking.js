"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooking = exports.getBooking = exports.cancelBooking = exports.createBooking = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const booking_1 = require("../modals/booking");
const createBooking = async (req, res, next) => {
    try {
        const { user, status, turfInfo, bookingInfo, total } = req.body;
        if (!user || !status || !turfInfo || !bookingInfo || !total)
            return next(new utility_class_1.default("Please enter all the field", 400));
        const booking = await booking_1.Booking.create({
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
        const booking = await booking_1.Booking.findById(id);
        if (!booking)
            return next(new utility_class_1.default("No Booking Found", 401));
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
        const bookings = await booking_1.Booking.find({});
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
