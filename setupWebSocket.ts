import { WebSocket } from "ws"
import * as http from "http";

export function setupWebSocket(server: http.Server) {
    // ws instance
    const wss = new WebSocket.Server({ port: 5001 });

    // what to do after a connection is established
    wss.on("connection", (ctx) => {
        // print number of active connections
        console.log("connected", wss.clients.size);
    });
}