import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

let io: SocketIOServer | undefined;

export const initSocket = (server: HttpServer) => {
  if (!io) {
    io = new SocketIOServer(server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("join", (roomId) => {
        socket.join(roomId);
        console.log(`Client joined room ${roomId}`);
      });

      socket.on("leave", (roomId) => {
        socket.leave(roomId);
        console.log(`Client left room ${roomId}`);
      });

      socket.on("message", ({ roomId, message }) => {
        io?.to(roomId).emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  return io;
};

export const getSocketInstance = () => io;

