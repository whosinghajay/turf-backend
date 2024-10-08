"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const keepAwake = () => {
    https_1.default.get("https://turf-backend-x3y6.onrender.com/api/v1/turf/all", (res) => {
        console.log(`Request sent to keep the server awake: ${res.statusCode}`);
    });
};
// Send a request every 28 minutes
setInterval(keepAwake, 14 * 60 * 1000);
