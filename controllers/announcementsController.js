const Message = require('../models/Message');
const AppError = require('../utils/AppError');
const Event = require('../models/Event')
const asyncHandler = require('../utils/asyncHandler');
const {sendSuccess} = require('../utils/responses');

exports.Announce = asyncHandler(async(req,res,next) => {
    const {eventId, text} = req.body;
    const eventExists = await Event.exists({ _id: eventId});
    if (!eventExists) {
        return next(new AppError('The event you were trying to make an announcement for was not found', 404));
    }
    const message = await Message.create({
        sender: req.user.userId || req.user._id,
        event: eventId,
        text
    });
    await message.populate('sender', 'name email');
    const io = req.app.get('io');

    io.to(eventId).emit('announcement', message);

    sendSuccess(res, message, "Successful Operation", 201);
});

exports.getAnnouncements = asyncHandler(async (req, res, next) => {
    const {eventId} = req.params;
    const eventExists = await Event.exists({ _id: eventId });
    if (!eventExists) {
        return next(new AppError('The event you were trying to find messages for was not found', 404));
    }
    const messages = await Message.find({event: eventId})
        .sort({createdAt: 1})
        .populate('sender', 'name email');
    sendSuccess(res, messages);
});