import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: [true, "Please entere the Phone Number"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter the gender"],
    },
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);