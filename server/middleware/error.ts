import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err:any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // wrong mongodb id error
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }

    // duplicate mongodb key error

    if(err.code === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!';
        err = new ErrorHandler(400, message);
    }

    // wrong jwt error
    if(err.code === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!';
        err = new ErrorHandler(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })

 }