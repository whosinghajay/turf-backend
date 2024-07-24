import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // user: {
    // username: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // },
    status: {
      type: String,
      enum: ["processing", "booked", "canceled"],
      default: "processing",
      required: true,
    },
    turfInfo: {
      turfName: {
        type: String,
        required: true,
      },
      turfPhoto: {
        type: String,
        required: true,
      },
      turfPrice: {
        type: Number,
        required: true,
      },
      turfLocation: {
        type: String,
        required: true,
      },
      turfId: {
        type: mongoose.Types.ObjectId,
        ref: "Turf",
        required: true,
      },
      slot: {
        courtNumber: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    },
    // bookingInfo: {
    //   city: {
    //     type: String,
    //     // required: true,
    //   },
    //   state: {
    //     type: String,
    //     // required: true,
    //   },
    //   country: {
    //     type: String,
    //     // required: true,
    //   },
    //   pinCode: {
    //     type: Number,
    //     // required: true,
    //   },
    // },
    total: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
