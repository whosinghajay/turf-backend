"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
