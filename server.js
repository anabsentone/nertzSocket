const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'NertzBot';

// Run when a client connects
io.on('connection', socket => {
    // socket.emit() broadcasts to that user
    socket.emit('message', formatMessage(botName, 'Welcome to nertz'));

    // socket.broadcast.emit() broadcasts to all clients except that user
    socket.broadcast.emit('message', formatMessage(botName, 'A new user connected'));
    
    // Run when a client disconnects
    socket.on('disconnect', () => {
        // io.emit() broadcasts to all users
        io.emit('message', formatMessage(botName, 'A user has disconnected'));
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));