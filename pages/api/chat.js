// pages/api/chat.js
import { Server } from 'socket.io';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle incoming messages
    const io = new Server().attach(3001); // Attach Socket.io to the same port

    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('message', (data) => {
        io.emit('message', data); // Broadcast the message to all connected clients
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    res.status(200).json({ message: 'Socket.io server running.' });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}
