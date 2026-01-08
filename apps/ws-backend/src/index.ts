import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

import {prismaClient} from "@repo/db/client"

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;


const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws: WebSocket, request) => {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
if(typeof decoded =="string"){
  ws.close();
  return;
}
    if (!decoded || !decoded.userId) {
      ws.close();
      return;
    }

    console.log(`✅ User connected: ${decoded.userId}`);
    ws.send("Welcome to WebSocket backend 🚀");

    ws.on("message", (msg: string | Buffer) => {
      console.log("📩 Received:", msg.toString());
      ws.send("pong");
    });

    ws.on("close", () => {
      console.log(`❌ User disconnected: ${decoded.userId}`);
    });
  } catch (err) {
    console.error("❌ Invalid token:", err);
    ws.close();
  }
});

console.log(`🚀 WebSocket server running on port ${PORT}`);
