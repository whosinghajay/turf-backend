import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      username: String,
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
    status: {
      type: String,
      enum: ["processing", "booked", "canceled"],
      default: "processing",
    },
    turfInfo: [
      {
        turfName: String,
        turfPhoto: String,
        turfPrice: Number,
        turfId: {
          type: mongoose.Types.ObjectId,
          ref: "Turf",
        },
        slot: Schema.Types.Mixed,
      },
    ],
    bookingInfo: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
