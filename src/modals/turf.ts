import mongoose, { Schema } from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide turf image"],
    },
    turfName: {
      type: String,
      required: [true, "Please provide us your turf name"],
    },
    turfLocation: {
      type: String,
      required: [true, "Please provide us your turf location"],
    },
    rating: {
      type: Number,
    },
    comments: {
      type: [String],
    },
    services: {
      type:[String],
      // type: [Schema.Types.Mixed],
      required: [true, "Mention the serives"],
    },
    courtNumbers: {
      type: Number,
      required: [true, "Provide us the number of court you have"],
    },
    slot: {
      type: [Schema.Types.Mixed],
    },
    price: {
      type: Number,
      required: [true, "Provide us the price of the turf"],
    },
    typeOfCourt: {
      type: String,
      required: [true, "Enter the type of court"],
    },
  },
  { timestamps: true }
);

export const Turf = mongoose.model("Turf", turfSchema);
