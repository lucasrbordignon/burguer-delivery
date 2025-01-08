import { Server } from 'socket.io';

let io: Server

export const initWebSocket = (server: any) => {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export const sendNotification = (userId: string, notification: any) => {
  io.emit(`notification:${userId}`, notification);
};
