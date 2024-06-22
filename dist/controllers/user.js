"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUser = exports.user = void 0;
const error_1 = require("../middlewares/error");
const user_1 = require("../modals/user");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
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
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user?.fullName}`,
    });
});
exports.getAllUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const user = await user_1.User.find({});
    return res.status(200).json({
        success: true,
        total: user.length,
        user,
    });
});
exports.getUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const user = await user_1.User.findById(id);
    if (!user)
        next(new utility_class_1.default("Invalid Id", 400));
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
    return res.status(200).json({
        success: true,
        message: "User deleted Successfully!",
    });
});
