class ErrorHandler extends Error {
    statusCode: Number;
    constructor(statusCode:Number, message:any) {
        super();
        this.statusCode = statusCode;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorHandler;