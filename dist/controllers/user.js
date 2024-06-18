"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerification = void 0;
const error_1 = require("../middlewares/error");
const user_1 = require("../modals/user");
exports.otpVerification = (0, error_1.TryCatch)(async (req, res, next) => {
    // throw new Error(); //to throw error and moves to catch block
    const { phoneNumber, gender, fullName } = req.body;
    //finding user using phone number
    let user = await user_1.User.findOne({ phoneNumber });
    //if user already there
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user?.fullName}`,
        });
    }
    //creating user
    user = await user_1.User.create({ phoneNumber, gender, fullName });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user?.fullName}`,
    });
});
