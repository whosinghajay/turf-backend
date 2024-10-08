"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const turf_1 = require("../controllers/turf");
const multer_js_1 = require("../middlewares/multer.js");
const auth_js_1 = require("../middlewares/auth.js");
const app = express_1.default.Router();
app.post("/create", multer_js_1.singleUpload, turf_1.createTurf);
// app.get("/all", adminOnly, getAllTurf);
app.get("/all", turf_1.getAllTurf);
app.get("/category", auth_js_1.adminOnly, turf_1.getAllTypes);
app.get("/latest", turf_1.getlatestTurf); //why??
app.get("/:id", turf_1.getTurf);
app.delete("/:id", turf_1.deleteTurf);
app.put("/:id", multer_js_1.singleUpload, turf_1.updateTurf);
exports.default = app;
