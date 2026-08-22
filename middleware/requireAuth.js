const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

const requireAuth = asyncHandler(async(req,res,next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){
        return next(new AppError('You must be logged in to access this route', 401));
    }
    const token = req.headers.authorization.split(' ')[1]
    try{
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secretKey'
        );
        req.user = verified;
        next();
    } catch(error){
        return next(new AppError('Invalid or expired token', 401))
    }
})

module.exports = requireAuth;