const app = require("../../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe('Events API testing', () =>{
    it('GET /api/events should return a 200 OK StatusCode with an array of events.', async() =>{
        const res = await request(app).get('/api/events')
        const events = res.body.data.data
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(events)).toBe(true);
    });

    it('POST /api/events should return a 401 Unauthorized StatusCode JWT token.', async() =>{
        const res = await request(app).post('/api/events').send({
            title: "Amazing Event!",
            description: "This is an amazing event!",
            category: '6a838a88e0e437392fb1ae25',
            date: '2026-09-23',
            city: 'Los Angelos',
            venue: 'City Hall',
            capacity: 10
        })
        expect(res.statusCode).toBe(401);
    });

    it('POST /api/events should return a 422 Unprocessable Entity StatusCode if there were any missing fields.', async() =>{
        const adminToken = 'Bearer ' + jwt.sign(
            { userId: '65c9f2b3d1e5c21123456789', role: 'admin' }, 
            process.env.JWT_SECRET || 'secretKey'
        );
        const res = await request(app).post('/api/events').set('Authorization', adminToken).send({})
        expect(res.statusCode).toBe(422);
    });
})