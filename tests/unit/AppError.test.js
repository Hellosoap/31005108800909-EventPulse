const AppError = require('../../utils/AppError')

describe('AppError util', () =>{
    it('Should set statuscode to 404 in Not Found cases, and set status to Fail for 4xx error cases.', () =>{
        const error = new AppError("Not found", 404);
        expect(error.statusCode).toBe(404);
        expect(error.status).toBe('Fail');
    });

    it('Should set status to Error in server error cases. (StatusCode 500)', () =>{
        const error = new AppError("Server error", 500);
        expect(error.status).toBe('Error');
    });

    it('Should set isOperational property to true by default.', () =>{
        const error = new AppError("Operational error", 400);
        expect(error.isOperational).toBe(true);
    });

    it('Should be an instance of standard JS Error.', () =>{
        const error = new AppError("JS error", 400);
        expect(error).toBeInstanceOf(Error);
    });
})