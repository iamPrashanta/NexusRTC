import { Server, Socket } from "socket.io";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket: Socket) => {
    console.log(`🔗 Client connected: ${socket.id}`);

    socket.on("join-room", ({ roomId, userId }) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { userId });
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}
