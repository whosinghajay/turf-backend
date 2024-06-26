"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = void 0;
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
//importing routes
const booking_js_1 = __importDefault(require("./routes/booking.js"));
const turf_js_1 = __importDefault(require("./routes/turf.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const stats_js_1 = __importDefault(require("./routes/stats.js"));
const error_js_1 = require("./middlewares/error.js");
const features_js_1 = require("./utils/features.js");
(0, dotenv_1.config)({
    path: "./.env",
});
const port = process.env.PORT || 3000;
//database connection
(0, features_js_1.connectDB)();
//node cache
exports.myCache = new node_cache_1.default();
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
//This is used to set up middleware for logging HTTP requests
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
//routes
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/turf", turf_js_1.default);
app.use("/api/v1/booking", booking_js_1.default);
app.use("/api/v1/dashboard", stats_js_1.default);
//used this middleware for multer
app.use("/uploads", express_1.default.static("uploads"));
//error middleware
app.use(error_js_1.errorMiddleware);
//server connection
app.listen(port, () => {
    console.log(`Port is listening at http://localhost:${port}`);
});
