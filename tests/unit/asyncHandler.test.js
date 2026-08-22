const asyncHandler = require('../../utils/asyncHandler')

describe('asyncHandler util', () =>{
    it('Should invoke the wrapped controller function with req, res, and next.', async() =>{
        const req = {};
        const res = {};
        const next = jest.fn();
        const resolvedController = jest.fn().mockResolvedValue();
        const handler = asyncHandler(resolvedController);
        await handler(req,res,next);
        expect(resolvedController).toHaveBeenCalledWith(req, res, next);
    });

    it('Should show if asyncHandler caught the error and passed it to next.', async() =>{
        const req = {};
        const res = {};
        const next = jest.fn();
        const fakeError = new Error('Error!')
        const rejectedController = jest.fn().mockRejectedValue(fakeError);
        const handler = asyncHandler(rejectedController);
        await handler(req,res,next);
        expect(next).toHaveBeenCalledWith(fakeError);
    });
})