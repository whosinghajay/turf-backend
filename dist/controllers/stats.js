"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPieCharts = exports.getDashboardStats = void 0;
const app_js_1 = require("../app.js");
const utility_class_js_1 = __importDefault(require("../utils/utility-class.js"));
const turf_js_1 = require("../modals/turf.js");
const user_js_1 = require("../modals/user.js");
const booking_js_1 = require("../modals/booking.js");
const features_js_1 = require("../utils/features.js");
const getDashboardStats = async (req, res, next) => {
    let stats;
    try {
        if (app_js_1.myCache.has("admin-stats")) {
            stats = JSON.parse(app_js_1.myCache.get("admin-stats"));
        }
        else {
            const today = new Date();
            const sixMonthAgo = new Date();
            sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
            const thisMonth = {
                start: new Date(today.getDate(), today.getMonth(), 1),
                end: today,
            };
            const lastMonth = {
                start: new Date(today.getDate(), today.getMonth() - 1, 1),
                end: new Date(today.getDate(), today.getMonth(), 0),
            };
            const thisMonthTurvesPromise = turf_js_1.Turf.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthTurvesPromise = turf_js_1.Turf.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const thisMonthUsersPromise = user_js_1.User.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthUsersPromise = user_js_1.User.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const thisMonthBookingsPromise = booking_js_1.Booking.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end,
                },
            });
            const lastMonthBookingsPromise = booking_js_1.Booking.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end,
                },
            });
            const lastSixMonthBookingsPromise = booking_js_1.Booking.find({
                createdAt: {
                    $gte: sixMonthAgo,
                    $lte: today,
                },
            });
            const latestTransactionPromise = booking_js_1.Booking.find({})
                .limit(4)
                .select(["turfInfo", "total", "status"]);
            const [thisMonthTurves, thisMonthUsers, thisMonthBookings, lastMonthTurves, lastMonthUsers, lastMonthBookings, usersCount, turvesCount, allBookings, lastSixMonthBookings, categories, maleUsers, latestTransaction,] = await Promise.all([
                thisMonthTurvesPromise,
                thisMonthUsersPromise,
                thisMonthBookingsPromise,
                lastMonthTurvesPromise,
                lastMonthUsersPromise,
                lastMonthBookingsPromise,
                user_js_1.User.countDocuments(),
                turf_js_1.Turf.countDocuments(),
                booking_js_1.Booking.find({}).select("total"),
                lastSixMonthBookingsPromise,
                turf_js_1.Turf.distinct("typeOfCourt"),
                user_js_1.User.countDocuments({ gender: "male" }),
                latestTransactionPromise,
            ]);
            const thisMonthRevenue = thisMonthBookings.reduce((total, booking) => total + (booking.total || 0), 0);
            const lastMonthRevenue = lastMonthBookings.reduce((total, booking) => total + (booking.total || 0), 0);
            const changePercent = {
                revenue: (0, features_js_1.calculatePercentage)(thisMonthRevenue, lastMonthRevenue),
                user: (0, features_js_1.calculatePercentage)(thisMonthUsers.length, lastMonthUsers.length),
                turf: (0, features_js_1.calculatePercentage)(thisMonthTurves.length, lastMonthTurves.length),
                booking: (0, features_js_1.calculatePercentage)(thisMonthBookings.length, lastMonthBookings.length),
            };
            const revenue = allBookings.reduce((total, booking) => total + (booking.total || 0), 0);
            const count = {
                revenue,
                user: usersCount,
                turf: turvesCount,
                booking: allBookings.length,
            };
            const bookingMonthCount = new Array(6).fill(0);
            const bookingMonthRevenue = new Array(6).fill(0);
            lastSixMonthBookings.forEach((booking) => {
                const creationDate = booking.createdAt;
                // const monthDiff = today.getMonth() - creationDate.getMonth();
                const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
                if (monthDiff < 6) {
                    bookingMonthCount[6 - monthDiff - 1] += 1;
                    bookingMonthRevenue[6 - monthDiff - 1] += booking.total;
                }
            });
            const categoryCount = await (0, features_js_1.getInventories)({
                categories,
                turvesCount,
            });
            const userRatio = {
                female: usersCount - maleUsers,
                male: maleUsers,
            };
            stats = {
                categoryCount, //not working properly
                changePercent,
                count,
                chart: {
                    order: bookingMonthCount,
                    revenue: bookingMonthRevenue,
                },
                userRatio,
                latestTransaction,
            };
            app_js_1.myCache.set("admin-stats", JSON.stringify(stats));
        }
        return res.status(200).json({
            success: true,
            stats,
        });
    }
    catch (error) {
        next(utility_class_js_1.default);
    }
};
exports.getDashboardStats = getDashboardStats;
const getPieCharts = async (req, res, next) => {
    try {
        let charts;
        if (app_js_1.myCache.has("admin-pie-charts")) {
            charts = JSON.parse(app_js_1.myCache.get("admin-pie-charts"));
        }
        else {
            const [processing, booked, canceled, categories, turvesCount] = await Promise.all([
                booking_js_1.Booking.countDocuments({ status: "processing" }),
                booking_js_1.Booking.countDocuments({ status: "booked" }),
                booking_js_1.Booking.countDocuments({ status: "canceled" }),
                turf_js_1.Turf.distinct("typeOfCourt"),
                turf_js_1.Turf.countDocuments(),
            ]);
            const bookingFullfillment = {
                processing,
                booked,
                canceled,
            };
            const turvesCategories = await (0, features_js_1.getInventories)({
                categories,
                turvesCount,
            });
            charts = {
                bookingFullfillment,
                turvesCategories,
            };
            app_js_1.myCache.set("admin-pie-charts", JSON.stringify(charts));
        }
        return res.status(200).json({
            success: true,
            charts,
        });
    }
    catch (error) {
        next(utility_class_js_1.default);
    }
};
exports.getPieCharts = getPieCharts;
