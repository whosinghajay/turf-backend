"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTurf = exports.deleteTurf = exports.turfCreate = void 0;
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
const deleteTurf = async (req, res, next) => {
    try {
        const { id } = req.params;
        const turf = await turf_1.Turf.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: `Turf ${turf?.turfName} deleted Successfully!`,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.deleteTurf = deleteTurf;
const updateTurf = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image, turfName, turfLocation, services, courtNumbers, price, typeOfCourt, } = req.body;
        const turf = await turf_1.Turf.findById(id);
        if (!turf)
            return next(new utility_class_1.default("Turf Not Found", 404));
        if (image)
            turf.image = image;
        if (turfName)
            turf.turfName = turfName;
        if (turfLocation)
            turf.turfLocation = turfLocation;
        if (services)
            turf.services = services;
        if (courtNumbers)
            turf.courtNumbers = courtNumbers;
        if (price)
            turf.price = price;
        if (typeOfCourt)
            turf.typeOfCourt = typeOfCourt;
        await turf.save();
        return res.status(201).json({
            success: true,
            message: `Successfully updated the turf ${turf?.turfName}`,
            turf,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.updateTurf = updateTurf;
