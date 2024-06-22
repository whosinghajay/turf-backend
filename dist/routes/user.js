"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const app = express_1.default.Router();
app.post("/create", user_1.user);
app.get("/all", auth_1.adminOnly, user_1.getAllUser);
app.get("/:id", user_1.getUser);
app.delete("/:id", user_1.deleteUser);
exports.default = app;
