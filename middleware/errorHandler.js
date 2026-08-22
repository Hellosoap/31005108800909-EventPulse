const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let status = err.status || 'Error';
    let message = err.message || 'Something went wrong';
    if(err.name === 'ValidationError'){
        statusCode = 400;
        status = 'Fail';
        message = 'Error: Invalid input data';
    }
    if(err.name === 'CastError'){
        statusCode = 400;
        status = 'Fail';
        message = 'Error: Invalid ID';
    }
    if(err.code === 11000){
        statusCode = 409;
        status = 'Fail';
        message = 'Error: Data already exists';
    }
    res.status(statusCode).json({
        status,
        message
    });
};

module.exports = errorHandler;