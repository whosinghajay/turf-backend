"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turf = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const turfSchema = new mongoose_1.default.Schema({
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
    slot: {
        type: [Date],
    },
    price: {
        type: Number,
        required: [true, "Provide us price of the turf"],
    },
    typeOfCourt: {
        //category
        type: String,
        required: [true, "Enter the type of court"],
    },
}, { timestamps: true });
exports.Turf = mongoose_1.default.model("Turf", turfSchema);
