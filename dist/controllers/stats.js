"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const app_1 = require("../app");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const getDashboardStats = async (req, res, next) => {
    let stats;
    try {
        if (app_1.myCache.has("admin-stats")) {
            stats = JSON.parse(app_1.myCache.get("admin-stats"));
        }
        else {
        }
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getDashboardStats = getDashboardStats;
