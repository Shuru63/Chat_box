class ErrorHandle extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode

        Error.captureStackTrace(this)
    }
}

module.exports = ErrorHandle