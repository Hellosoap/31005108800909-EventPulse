const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const connectDB = require('./db/connectDB');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registerRoutes = require('./routes/registerRoutes');
const announcementsRoutes = require('./routes/announcementsRoutes');
const errorHandler = require('./middleware/errorHandler');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.set('io', io);

io.on('connection', (socket) => {
    console.log(`${socket.id} has connected.`);
    socket.on('join_event', (eventId) => {
        socket.join(eventId);
        console.log(`${socket.id} joined event room ${eventId}`);
    });
    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected.`);
    });
});

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
      value: req.query,
      writable: true,
      enumerable: true,
      configurable: true
    });
    next();
});
  
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registerRoutes)
app.use('/api/announcements', announcementsRoutes)

app.get('/health', (req, res) => {
    const connectionStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        database: connectionStatus
    });
});

app.use((req, res, next) => {
    res.status(404).json({status: 'Fail', message: 'Route not found'});
});
  
app.use(errorHandler);

async function start(){
    await connectDB();
    if(process.env.NODE_ENV !== 'test'){
            server.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }
}
  
start();

module.exports = app;