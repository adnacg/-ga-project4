import openSocket from "socket.io-client";
import { HOST, port } from "../constants";

let socket;
function subscribeToPose(orderId, cb) {
  socket = openSocket(`http://${HOST}:${port}`);
  socket.emit("start", orderId);
  socket.on("update", state => cb(null, state));
}
function unsubscribeToPose() {
  socket.close();
}

export { subscribeToPose, unsubscribeToPose };
