"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_js_1 = require("../controllers/booking.js");
const app = express_1.default.Router();
app.post("/create", booking_js_1.createBooking);
app.delete("/:id", booking_js_1.cancelBooking);
// app.put("/:id", userOnly, changeTime);
app.get("/all", booking_js_1.getAllBooking);
app.get("/:id", booking_js_1.getBooking);
app.put('/:id', booking_js_1.updateBooking);
exports.default = app;
