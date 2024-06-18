"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerification = void 0;
const user_1 = require("../modals/user");
const otpVerification = async (req, res, next) => {
    try {
        const { phoneNumber, gender, fullName } = req.body;
        const user = await user_1.User.create({ phoneNumber, gender, fullName });
        return res.status(201).json({
            success: true,
            message: `Welcome, ${user.fullName}`,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.otpVerification = otpVerification;
