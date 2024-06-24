import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
