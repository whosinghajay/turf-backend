"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const turf_1 = require("../controllers/turf");
const app = express_1.default.Router();
app.post("/", turf_1.turfCreate);
exports.default = app;