import { Server } from 'socket.io';

const io = new Server(3000);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', (data) => {
        io.emit('update', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

export default io;
