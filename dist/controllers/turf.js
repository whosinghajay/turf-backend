"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turfCreate = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const turf_1 = require("../modals/turf");
const turfCreate = async (req, res, next) => {
    try {
        const { image, turfName, turfLocation, services, courtNumbers, price, typeOfCourt, } = req.body;
        if (!image ||
            !turfName ||
            !turfLocation ||
            !services ||
            !courtNumbers ||
            !price ||
            !typeOfCourt)
            return next(new utility_class_1.default("Please provide all fields", 400));
        let turf = await turf_1.Turf.create({
            image,
            turfName,
            turfLocation,
            services,
            courtNumbers,
            price,
            typeOfCourt,
        });
        console.log("hhhh");
        res.status(201).json({
            success: true,
            turf,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.turfCreate = turfCreate;
