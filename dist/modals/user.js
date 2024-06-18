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
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
