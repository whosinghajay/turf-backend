"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorMiddleware = void 0;
const errorMiddleware = (
//   err: Error,
err, req, res, next) => {
    err.message || (err.message = "Internal Server Error");
    err.statusCode || (err.statusCode = 500);
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.errorMiddleware = errorMiddleware;
//trycatch wrapper
const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.TryCatch = TryCatch;
