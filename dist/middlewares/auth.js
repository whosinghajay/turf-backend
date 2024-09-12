"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOnly = exports.turfPosterOnly = exports.adminOnly = void 0;
const user_js_1 = require("../modals/user.js");
const utility_class_js_1 = __importDefault(require("../utils/utility-class.js"));
const adminOnly = async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new utility_class_js_1.default("You have to login first", 401));
    const user = await user_js_1.User.findById(id);
    if (!user)
        return next(new utility_class_js_1.default("No user found", 401));
    if (user.role !== "admin")
        return next(new utility_class_js_1.default("You've to be admin in order to access it", 401));
    next();
};
exports.adminOnly = adminOnly;
const turfPosterOnly = async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new utility_class_js_1.default("You have to login first", 401));
    const user = await user_js_1.User.findById(id);
    if (!user)
        return next(new utility_class_js_1.default("No user found", 401));
    if (user.role !== "turfPoster")
        return next(new utility_class_js_1.default("You've to be turfPoster in order to access it", 401));
    next();
};
exports.turfPosterOnly = turfPosterOnly;
const userOnly = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id)
            return next(new utility_class_js_1.default("You have to login first", 401));
        const user = await user_js_1.User.findById(id);
        if (!user)
            return next(new utility_class_js_1.default("No user found", 401));
        if (user.role !== "user")
            return next(new utility_class_js_1.default("You have to be user in order to book a turf", 401));
        next();
    }
    catch (error) {
        next(utility_class_js_1.default);
    }
};
exports.userOnly = userOnly;
