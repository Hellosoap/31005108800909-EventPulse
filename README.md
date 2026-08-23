# EVENTPULSE API

- EventPulse API is a backend service for an event management platform. It handles JWT authentication, event discovery and management, capacity-controlled registrations, and live Socket.io announcements for event attendees.

*Tech Stack:*

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Jest & Supertest

## INSTALLATION STEPS

(1) - git clone https://github.com/Hellosoap/31005108800909-EventPulse.git

(2) - cd 31005108800909-EventPulse

(3) - npm install

(4) - Create .env file (see table)

(5) - npm run seed

(6) - npm run dev

## ENVIRONMENT VARIABLES TABLE

| Variable | Description | Example |
| :--- | :--- | :--- |
| PORT | Server port | 3000 |
| NODE_ENV | Environment mode | development |
| MONGO_URL | MongoDB connection URL | mongodb+cluster_url |
| JWT_SECRET | Secret key for JWT signing | your_jwt_secret_key |
| JWT_EXPIRES_IN | JWT token expiration duration | 7d |

## API ENDPOINTS

*Note: If you run all the Postman tests at once, you might get errors.*

### AUTH API

| Method | URL | Description |
| :--- | :--- | :--- |
| POST | /api/auth/register | Register a new user account |
| POST | /api/auth/login | Authenticate user and receive JWT |

### EVENTS API

| Method | URL | Description |
| :--- | :--- | :--- |
| GET | /api/events | Retrieve all events in a list |
| GET | /api/events/:id | Fetch a single specific event |
| POST | /api/events | Post a new event (admin only) |
| PATCH | /api/events/:id | Patch an event (admin only) |
| DELETE | /api/events/:id | Delete a specific event (admin only) |

### REGISTRATIONS API

| Method | URL | Description |
| :--- | :--- | :--- |
| POST | /api/registrations | Register for an event |
| GET | /api/registrations/my | Retrieve all my registrations |
| DELETE | /api/registrations/:id | Cancel a specific registration |

### ANNOUNCEMENTS API

| Method | URL | Description |
| :--- | :--- | :--- |
| POST | /api/announcements | Post an announcement for an event |
| GET | /api/announcements/:eventId | Retrieve all announcements of a specific event |


### LIVE DEPLOYMENT

*Note: the database might appear disconnected when you first open the live link, wait a few seconds and it will get connected.*

**Live Deployment Link:** event-pulse-byrboi5op-high-we-go.vercel.app
**Live Domain:** event-pulse-mauve.vercel.app

