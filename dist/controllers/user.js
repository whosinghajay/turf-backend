"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUser = exports.user = void 0;
const error_1 = require("../middlewares/error");
const user_1 = require("../modals/user");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const app_1 = require("../app");
const features_1 = require("../utils/features");
exports.user = (0, error_1.TryCatch)(async (req, res, next) => {
    // throw new Error(); //to throw error and moves to catch block
    const { phoneNumber, gender, fullName, location, role } = req.body;
    //finding user using phone number
    let user = await user_1.User.findOne({ phoneNumber });
    //if user already there
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user?.fullName}`,
        });
    }
    //empty field error
    if (!phoneNumber || !gender || !fullName || !location || !role) {
        return next(new utility_class_1.default("Please add all fields", 400));
    }
    //creating user
    user = await user_1.User.create({ phoneNumber, gender, fullName, location, role });
    await (0, features_1.invalidateCache)({ user: true });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user?.fullName}`,
    });
});
exports.getAllUser = (0, error_1.TryCatch)(async (req, res, next) => {
    let user;
    if (app_1.myCache.has("getAllUser")) {
        user = JSON.parse(app_1.myCache.get("getAllUser"));
    }
    else {
        user = await user_1.User.find({});
        app_1.myCache.set("getAllUser", JSON.stringify(user));
    }
    return res.status(200).json({
        success: true,
        total: user.length,
        user,
    });
});
exports.getUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    let user;
    if (app_1.myCache.has(`getUser-${id}`)) {
        user = JSON.parse(app_1.myCache.get(`getUser-${id}`));
    }
    else {
        user = await user_1.User.findById(id);
        if (!user)
            next(new utility_class_1.default("Invalid Id", 400));
        app_1.myCache.set(`getUser-${id}`, JSON.stringify(user));
    }
    return res.status(200).json({
        success: true,
        user,
    });
});
exports.deleteUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_1.User.findById(id);
    if (!user)
        return next(new utility_class_1.default("Invalid Id", 400));
    await user?.deleteOne();
    await (0, features_1.invalidateCache)({ user: true, userId: String(user._id) });
    return res.status(200).json({
        success: true,
        message: "User deleted Successfully!",
    });
});
