import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const wss = new WebSocketServer({ port: Number(PORT) });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Welcome to WebSocket backend 🚀");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log(`WebSocket server running on port ${PORT}`);
