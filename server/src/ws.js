import paths from "./paths";

export default (io, db) => {
  const { Robot, Order } = db;
  io.on("connection", function(socket) {
    console.log("a user connected");
    let timer;

    socket.on("disconnect", function() {
      console.log("user disconnected");
      clearInterval(timer);
    });

    socket.on("start", orderId => {
      timer = setInterval(async () => {
        // Fetch current pose for robot with orderId
        const order = await Order.findById(orderId);
        if (order.deliveryStatus === "Closed") {
          return clearInterval(timer);
        }
        if (order.deliveryStatus === "Preparing") {
          socket.emit("update", {
            x: paths[1][0].x,
            y: paths[0][0].y,
            status: "Preparing"
          });
          return;
        }
        const robot = await Robot.findOne({
          where: {
            orderId
          }
        });
        if (robot.length === 0) return;
        const currentPath = paths[order.userId];
        const { x, y } = currentPath[robot.poseIndex];

        if (robot.poseIndex === currentPath.length - 1) {
          socket.emit("update", { x, y, status: "Arrived" });
          clearInterval(timer);
          return;
        }
        socket.emit("update", { x, y, status: "On the way" });
      }, 1000);
    });
  });
};
