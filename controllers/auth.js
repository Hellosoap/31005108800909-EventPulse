const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const {sendSuccess} = require('../utils/responses');


exports.register = asyncHandler(async(req,res,next) => {
    const {name,email,password} = req.body;
    const existing = await User.findOne({email});
    if(existing){
        return next(new AppError('The provided email already exists.', 400))
    };
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPass
    });

    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET || 'secretKey',
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    );

    const data = {
        token,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
    return sendSuccess(res, data, 'User has registered successfully.', 201);
});

exports.login = asyncHandler(async(req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new AppError('Invalid email or password.', 401))
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return next(new AppError('Invalid email or password.', 401));
    };
    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET || 'secretKey',
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    );
    const data = {
        token
    };
    return sendSuccess(res, data, 'User has logged in successfully.', 200);
});