"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
            slot: mongoose_1.Schema.Types.Mixed,
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
