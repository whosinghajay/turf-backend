"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//routes
app.use("/api/v1/user", user_js_1.default);
app.listen(port, () => {
    console.log(`Port is listening at http://localhost:${port}`);
});
