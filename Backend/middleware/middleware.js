const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const errorhandle = require("../Utils/ErrorHandle")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 400;
    err.message = err.message || "Internal server error";

    if (err.name == "CastError") {
        const message = `resourece is not found ${err.path}`;
        err=new errorhandle(message,400)

    }
    if (err.code == 11000) {
        const message = `duplicate ${object.key(err,keyvalue)} Entered`;
        err=new errorhandle(message,400)

    }
    if (err.name == "JsonWebTokenError") {
        const message = `Json web Token is Invalid try again`;
        err=new errorhandle(message,400)

    }
    if (err.name == "TokenExpiredError") {
        const message = `Json web Token is Expired try again`;
        err=new errorhandle(message,400)

    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message

    });
};