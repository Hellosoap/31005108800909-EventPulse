const Event = require('../models/Event');
const Category = require('../models/Category')
const {sendSuccess} = require('../utils/responses');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async(req,res,next) => {
    const {category, city, startDate, endDate, page = 1, limit = 5, sortBy, order, search} = req.query
    let query = {}
    if(category){
        query.category = category;
    }
    if(city){
        query.city = city;
    }
    if(startDate || endDate){
        query.date = {}
        if(startDate){
            query.date.$gte = new Date(startDate);
        }
        if(endDate){
            query.date.$lte = new Date(endDate);
        }
    }
    if(search){
        query.$or = [
            {title: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
        ]
    }
    const allowedSortFields = ['date', 'registrations'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'date';
    let sortDirection = order === 'desc' ? -1 : 1;
    if (sortBy === 'registrations' && !order) {
        sortDirection = -1;
    }
    const sortQuery = {[sortField]: sortDirection};

    const pageCount = Number(page);
    const minimumLimit = Number(limit);
    const skip = (pageCount - 1) * minimumLimit;
    const [events, total] = await Promise.all([
        Event.find(query)
            .populate('category')
            .sort(sortQuery)
            .skip(skip)
            .limit(minimumLimit),
        Event.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / minimumLimit);
    sendSuccess(res, {total, page: pageCount, limit: minimumLimit, totalPages,data: events});
});

exports.getOne = asyncHandler(async(req,res,next) => {
    const event = await Event.findById(req.params.id).populate('category').populate('organizer')
    if(!event){
        return next(new AppError('The event you were looking for was not found.', 404))
    }
    sendSuccess(res,{event})
})

exports.create = asyncHandler(async(req,res,next) => {
    const eventInfo = {
        ...req.body,
        organizer: req.user.userId,
        registrations: 0
    };
    const event = await Event.create(eventInfo)
    sendSuccess(res,{event}, 'Successful Operation.', 201)
})

exports.update = asyncHandler(async(req,res,next) => {
    const event = await Event.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        {new: true, runValidators: true}
    ).populate('category').populate('organizer');
    if(!event){
        return next(new AppError('The event you were trying to update was not found.', 404))
    }
    sendSuccess(res,{event})
})

exports.delete = asyncHandler(async(req,res,next) => {
    const event = await Event.findByIdAndDelete(req.params.id)
    if(!event){
        return next(new AppError('The event you were trying to delete was not found.', 404))
    }
    sendSuccess(res,null,'Successful Operation.', 200)
})
