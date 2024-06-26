"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentage = exports.invalidateCache = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const turf_1 = require("../modals/turf");
const connectDB = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URI, { dbName: "turf" })
        .then((c) => console.log(`DB connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
exports.connectDB = connectDB;
const invalidateCache = async ({ turf, admin, }) => {
    if (turf) {
        const turfKeys = ["types", "getAllTurf"];
        const turfs = await turf_1.Turf.find({}).select("_id");
        turfs.forEach((i) => {
            turfKeys.push(`getTurf-${i._id}`);
        });
        app_1.myCache.del(turfKeys);
    }
    if (admin) {
        app_1.myCache.del(["admin-stats"]);
    }
};
exports.invalidateCache = invalidateCache;
const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth == 0)
        return thisMonth * 100;
    const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0)); // toFixed return string
};
exports.calculatePercentage = calculatePercentage;
