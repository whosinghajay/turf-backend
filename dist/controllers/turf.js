"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlatestTurf = exports.getAllTypes = exports.updateTurf = exports.deleteTurf = exports.getAllTurf = exports.getTurf = exports.createTurf = void 0;
const fs_1 = require("fs");
const turf_1 = require("../modals/turf");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const app_1 = require("../app");
const features_1 = require("../utils/features");
const createTurf = async (req, res, next) => {
    try {
        const { turfName, turfLocation, services, courtNumbers, price, typeOfCourt, } = req.body;
        const image = req.file;
        if (!image)
            return next(new utility_class_1.default("Please Add Photo", 400));
        if (!turfName ||
            !turfLocation ||
            !services ||
            !courtNumbers ||
            !price ||
            !typeOfCourt) {
            (0, fs_1.rm)(image.path, () => {
                console.log("Deleted");
            });
            return next(new utility_class_1.default("Please provide all fields", 400));
        }
        let turf = await turf_1.Turf.create({
            image: image.path,
            turfName,
            turfLocation,
            services,
            courtNumbers,
            price,
            typeOfCourt,
        });
        await (0, features_1.invalidateCache)({ turf: true });
        res.status(201).json({
            success: true,
            turf,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTurf = createTurf;
const getTurf = async (req, res, next) => {
    try {
        const { id } = req.params;
        let turf;
        if (app_1.myCache.has(`getTurf-${id}`)) {
            turf = JSON.parse(app_1.myCache.get(`getTurf-${id}`));
        }
        else {
            turf = await turf_1.Turf.findById(id);
            if (!turf)
                return next(new utility_class_1.default("Invalid Turf", 400));
            app_1.myCache.set(`getTurf-${id}`, JSON.stringify(turf));
        }
        return res.status(201).json({
            success: true,
            turf,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getTurf = getTurf;
const getAllTurf = async (req, res, next) => {
    try {
        let turf;
        if (app_1.myCache.has("getAllTurf")) {
            turf = JSON.parse(app_1.myCache.get("getAllTurf"));
        }
        else {
            turf = await turf_1.Turf.find({});
            app_1.myCache.set("getAllTurf", JSON.stringify(turf));
        }
        return res.status(201).json({
            success: true,
            total: turf.length,
            turf,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getAllTurf = getAllTurf;
const deleteTurf = async (req, res, next) => {
    try {
        const { id } = req.params;
        const turf = await turf_1.Turf.findById(id);
        if (!turf)
            return next(new utility_class_1.default("Turf not found", 400));
        (0, fs_1.rm)(turf?.image, () => {
            console.log("image deleted successfully");
        });
        await turf.deleteOne();
        await (0, features_1.invalidateCache)({ turf: true, turfId: String(turf._id) });
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
        const { turfName, turfLocation, services, courtNumbers, price, typeOfCourt, } = req.body;
        const image = req.file;
        const turf = await turf_1.Turf.findById(id);
        if (!turf)
            return next(new utility_class_1.default("Turf Not Found", 404));
        if (image) {
            (0, fs_1.rm)(turf.image, () => {
                console.log("previous image deleted and the new one is added");
            });
            turf.image = image.path;
        }
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
        await (0, features_1.invalidateCache)({ turf: true, turfId: String(turf._id) });
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
const getAllTypes = async (req, res, next) => {
    let types;
    if (app_1.myCache.has("types")) {
        types = JSON.parse(app_1.myCache.get("types"));
    }
    else {
        types = await turf_1.Turf.distinct("typeOfCourt");
        app_1.myCache.set("types", JSON.stringify(types));
    }
    return res.status(200).json({
        success: true,
        total: types.length,
        types,
    });
};
exports.getAllTypes = getAllTypes;
//why do i need this?
const getlatestTurf = async (req, res, next) => {
    try {
        const turf = await turf_1.Turf.find({}).sort({ createdAt: -1 });
        return res.status(201).json({
            success: true,
            turf,
        });
    }
    catch (error) {
        next(utility_class_1.default);
    }
};
exports.getlatestTurf = getlatestTurf;
