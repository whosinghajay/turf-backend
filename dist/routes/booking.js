"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../controllers/booking");
const app = express_1.default.Router();
app.post("/create", booking_1.createBooking);
app.delete("/:id", booking_1.cancelBooking);
// app.put("/:id", userOnly, changeTime);
app.get("/all", booking_1.getAllBooking);
app.get("/:id", booking_1.getBooking);
exports.default = app;
