const Event = require('../models/Event');
const Registration = require('../models/Registration')
const {sendSuccess} = require('../utils/responses');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.registerForAnEvent = asyncHandler(async(req,res,next) => {
    const eventId = req.body.event;
    const userId = req.user.userId;
    const event = await Event.findById(eventId);
    if(!event){
        return next(new AppError('The event you were trying to register for was not found.', 404))
    };
    // countDocuments() method is not used here because the registrations of an event made in seed aren't real documents, so no matter what the code would break if the documents are not real
    if(event.registrations >= event.capacity){ // (>=) Is used so if 2 or more users click register at the same time, no further registrations will be accepted
        return next(new AppError('This event is full.', 400))
    };
    const registered = await Registration.findOne({attendee: userId, event: eventId})
    if(registered){
        return next(new AppError('You already registered for this event.', 400))
    };
    const validRegistration = await Registration.create({
        attendee: userId,
        event: eventId
    });
    event.registrations += 1;
    await event.save();
    sendSuccess(res,validRegistration,'Attendee has registered successfully.', 201);
})

exports.getAllUserRegistrations = asyncHandler(async(req,res,next) => {
    const userId = req.user.userId;
    const userRegistrations = await Registration.find({attendee: userId}).populate('event');
    sendSuccess(res,userRegistrations);
})

exports.cancelRegistration = asyncHandler(async(req,res,next) => {
    const userId = req.user.userId;
    const registrationId = req.params.id
    const registration = await Registration.findOne({_id: registrationId});
    if(!registration){
        return next(new AppError('The registration you were trying to cancel was not found.', 404))
    };

    if(registration.attendee.toString() !== userId) {
        return next(new AppError('You can only cancel your own registration.', 403))
    };
    await Registration.findByIdAndDelete(registrationId);
    const event = await Event.findById(registration.event);
    if(event && event.registrations > 0){
        event.registrations -= 1
        await event.save();
    };
    sendSuccess(res,null,'Registration cancelled successfully', 200);
})