// Response for successful operations
exports.sendSuccess = (res,data,message = "Successful Operation",statusCode = 200) =>{
    return res.status(statusCode).json({
        status: 'Success',
        message: message,
        data: data
    });
};

exports.sendError = (res,data,message = "Operation went wrong", statusCode = 500) =>{
    return res.status(statusCode).json({
        status: String(statusCode).startsWith(4) ? 'Fail' : 'Error',
        message: message,
        data: data
    })
}