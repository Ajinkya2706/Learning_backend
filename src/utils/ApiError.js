
// mtlb jab koi bhi response aayega to apne hisab se apn
// ne bana liya hai ye 

class ApiError extends Error{
    constructor (
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = ""

    ){
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.message = message
        this.success = false
        this.errors = errors

    if(statck){
        this.stack = statck
    } 
    else{
        Error.captureStackTrace(this, this.constructor)
    }

    }
}

export {ApiError}