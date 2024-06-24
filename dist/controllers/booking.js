"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
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
