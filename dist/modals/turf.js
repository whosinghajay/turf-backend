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
exports.Turf = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
        type: String,
        required: [true, "Mention the serives"],
    },
    courtNumbers: {
        type: Number,
        required: [true, "Provide us the number of court you have"],
    },
    slot: {
        type: [mongoose_1.Schema.Types.Mixed],
    },
    price: {
        type: Number,
        required: [true, "Provide us the price of the turf"],
    },
    typeOfCourt: {
        type: String,
        required: [true, "Enter the type of court"],
    },
}, { timestamps: true });
exports.Turf = mongoose_1.default.model("Turf", turfSchema);
