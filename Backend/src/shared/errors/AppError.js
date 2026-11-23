import errorCodes from "./error-codes.js";
class ErrorAPI extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.errorCode = errorCodes[this.statusCode] ;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorAPI;