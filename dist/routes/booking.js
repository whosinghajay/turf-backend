"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../controllers/booking");
const auth_1 = require("../middlewares/auth");
const app = express_1.default.Router();
app.post("/create", auth_1.userOnly, booking_1.createBooking);
exports.default = app;
