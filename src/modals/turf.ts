import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    time: {
      type: String, // or Date, based on the requirement
      // required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      // required: true,
    },
    slots: [timeSlotSchema],
  },
  { _id: false }
);

const courtSchema = new mongoose.Schema(
  {
    courtNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    days: [daySchema],
  },
  { _id: false }
);

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
      type: [String],
      required: [true, "Mention the serives"],
    },
    courtNumbers: {
      type: Number,
      // required: [true, "Provide us the number of court you have"],
    },
    slot: [courtSchema],
    price: {
      type: Number,
      required: [true, "Provide us the price of turf"],
    },
    typeOfCourt: {
      //category
      type: String,
      required: [true, "Enter the type of court"],
    },
  },
  { timestamps: true }
);

export const Turf = mongoose.model("Turf", turfSchema);
