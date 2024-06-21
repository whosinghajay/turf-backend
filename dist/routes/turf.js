"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const turf_1 = require("../controllers/turf");
const multer_1 = require("../middlewares/multer");
const app = express_1.default.Router();
app.post("/", multer_1.singleUpload, turf_1.createTurf);
app.get("/:id", turf_1.getTurf);
app.delete("/:id", turf_1.deleteTurf);
app.put("/:id", multer_1.singleUpload, turf_1.updateTurf);
exports.default = app;
