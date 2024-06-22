"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const turf_js_1 = __importDefault(require("./routes/turf.js"));
const features_js_1 = require("./utils/features.js");
const error_js_1 = require("./middlewares/error.js");
const node_cache_1 = __importDefault(require("node-cache"));
const port = process.env.PORT || 3000;
//database connection
(0, features_js_1.connectDB)();
//node cache
exports.myCache = new node_cache_1.default();
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/turf", turf_js_1.default);
//used this middleware for multer
app.use("/uploads", express_1.default.static("uploads"));
//error middleware
app.use(error_js_1.errorMiddleware);
//server connection
app.listen(port, () => {
    console.log(`Port is listening at http://localhost:${port}`);
});
