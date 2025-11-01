import express, { Express } from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { registerSocketHandlers } from "./handlers";
import { NexusConfig } from "../config/defaults";

export async function createAppServer(config: NexusConfig): Promise<http.Server> {
  const app: Express = express();
  const server = http.createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: config.corsOrigin || "*",
    },
  });

  registerSocketHandlers(io);

  app.get("/", (_req, res) => {
    res.json({ message: "NexusRTC server is live" });
  });

  return server;
}
