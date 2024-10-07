"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = exports.generateOTP = void 0;
const SMSINDORI_USERNAME = process.env.SMSINDORI_USERNAME;
const SMSINDORI_PASSWORD = process.env.SMSINDORI_PASSWORD;
const SMSINDORI_SENDER_ID = process.env.SMSINDORI_SENDER_ID;
const SMSINDORI_TEMPLATE_ID = process.env.SMSINDORI_TEMPLATE_ID;
// To Generate a 4-digit OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
exports.generateOTP = generateOTP;
const sendOTP = async (phoneNumber, otp) => {
    //   const message = `Your OTP is: ${otp}`;
    console.log(phoneNumber, "number");
    console.log(otp, "otp");
    // const url = `http://sms.smsindori.com/http-api.php?username=${SMSINDORI_USERNAME}&password=${SMSINDORI_PASSWORD}&senderid=${SMSINDORI_SENDER_ID}&route=06&number=${phoneNumber}&message=${otp} is your Login otp for ChatHooter IMRSMS&templateid=${SMSINDORI_TEMPLATE_ID}`;
    // try {
    //   const response = await axios.get(url);
    //   return response.data;
    // } catch (error) {
    //   throw new Error("Failed to send OTP");
    // }
};
exports.sendOTP = sendOTP;
