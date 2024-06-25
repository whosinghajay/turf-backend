"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    user: {
        username: String,
        userId: {
            type: mongoose_1.default.Types.ObjectId,
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
                type: mongoose_1.default.Types.ObjectId,
                ref: "Turf",
            },
            slot: {
                date: Date,
                time: {
                    startTime: Date,
                    endTime: Date,
                },
            },
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
}, { timestamps: true });
exports.Booking = mongoose_1.default.model("Booking", bookingSchema);
