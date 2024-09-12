"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stats_js_1 = require("../controllers/stats.js");
const auth_js_1 = require("../middlewares/auth.js");
const app = express_1.default.Router();
app.get("/stats", auth_js_1.adminOnly, stats_js_1.getDashboardStats);
app.get("/pie", auth_js_1.adminOnly, stats_js_1.getPieCharts);
exports.default = app;
