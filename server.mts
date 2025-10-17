import { createServer } from "node:http";
import * as Next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const next = (Next as any).default ?? Next;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const userRooms = new Map<string, { username: string; room: string }>();

  const httpServer = createServer(handle);
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({room, username}) => {
      socket.join(room);
      userRooms.set(socket.id, { username, room });
      console.log(`User ${username} joined room ${room}`);
      socket.to(room).emit("user_joined", `${username} joined room`);
    })

    socket.on("message", ({room, message, sender}) => {
      console.log(`Message from ${sender} in room ${room}: ${message}`);
      socket.to(room).emit("message", { sender, message });
    })

    socket.on("disconnect", () => {
      const userData = userRooms.get(socket.id);
      console.log(`User disconnected: ${socket.id}`)

      if (userData) {
        const { username, room } = userData;
        console.log(`User ${username} disconnected from room ${room}`);
        socket.to(room).emit("user_left", `${username} left the room`);
        userRooms.delete(socket.id);
      } else {
        console.log(`User disconnected: ${socket.id}`);
      }
    })
  })

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  })
})