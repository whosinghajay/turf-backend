"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turf = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timeSlotSchema = new mongoose_1.default.Schema({
    time: {
        type: String, // or Date, based on the requirement
        // required: true,
    },
    booked: {
        type: Boolean,
        default: false,
    },
}, { _id: false });
const daySchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        // required: true,
    },
    slots: [timeSlotSchema],
}, { _id: false });
const courtSchema = new mongoose_1.default.Schema({
    courtNumber: {
        type: Number,
        // required: true,
    },
    days: [daySchema],
}, { _id: false });
const turfSchema = new mongoose_1.default.Schema({
    turfId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
        required: [true, "Provide us the number of court you have"],
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
}, { timestamps: true });
exports.Turf = mongoose_1.default.model("Turf", turfSchema);
