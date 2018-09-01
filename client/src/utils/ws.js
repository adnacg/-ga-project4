import openSocket from "socket.io-client";
let socket;
function subscribeToPose(orderId, cb) {
  socket = openSocket("http://localhost:5000");
  console.log("SEEEEEND", orderId);
  socket.emit("start", orderId);
  socket.on("update", state => cb(null, state));
}
function unsubscribeToPose() {
  socket.close();
}

export { subscribeToPose, unsubscribeToPose };
