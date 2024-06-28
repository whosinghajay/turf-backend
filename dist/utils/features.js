"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventories = exports.calculatePercentage = exports.invalidateCache = exports.connectDB = void 0;
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
const invalidateCache = async ({ user, userId, turf, turfId, booking, bookingId, admin, }) => {
    if (user) {
        const userKeys = ["getAllUser"];
        if (typeof userId === "string")
            userKeys.push(`getUser-${userId}`);
        if (typeof userId === "object")
            userId.forEach((i) => userKeys.push(`getUser-${i}`));
        app_1.myCache.del(userKeys);
    }
    if (turf) {
        const turfKeys = ["types", "getAllTurf"];
        // const turfs = await Turf.find({}).select("_id");
        // turfs.forEach((i) => {
        //   turfKeys.push(`getTurf-${i._id}`);
        // });
        if (typeof turfId === "string")
            turfKeys.push(`getTurf-${turfId}`);
        if (typeof turfId === "object")
            turfId.forEach((i) => turfKeys.push(`getTurf-${i}`));
        app_1.myCache.del(turfKeys);
    }
    if (booking) {
        const bookingKeys = ["getAllBooking"];
        if (typeof bookingId === "string")
            bookingKeys.push(`getBooking-${bookingId}`);
        if (typeof bookingId === "object")
            bookingId.forEach(i => bookingKeys.push(`getBooking-${i}`));
        app_1.myCache.del(bookingKeys);
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
//not working properly
const getInventories = async ({ categories, turvesCount, }) => {
    const categoriesCountPromise = categories.map((category) => turf_1.Turf.countDocuments({ category }));
    const categoriesCount = await Promise.all(categoriesCountPromise); //not working properly
    const categoryCount = [];
    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / turvesCount) * 100),
        });
    });
    return categoryCount;
};
exports.getInventories = getInventories;
