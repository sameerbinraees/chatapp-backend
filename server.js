/* eslint-disable no-console */
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});
const cors = require('cors');
// const morgan = require('morgan');

app.use(cors());
// app.use(morgan('dev'));

app.get('/status', (req, res) => {
    res.send({ status: 'Sever is active' });
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // on receiving message from client
    socket.on('message', (text) => {
        console.log(text);
        socket.emit('message', text);
    });

    // on disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(8080, () => {
    console.log('listening on port: 8080');
});
