import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: [true, "Please entere the Phone Number"],
      unique: true,
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
    location: {
      type: String,
      required: [true, "Please provide location of yours"],
    },
    // favorite: {
    //   type: [Schema.Types.Mixed],
    // },
    // booking: {
    //   type: [Schema.Types.Mixed],
    // },
    role: {
      type: String,
      enum: ["user", "turfPoster", "admin"],
      required: [true, "Please provide your role"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
