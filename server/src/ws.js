const paths = [
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ],
  [
    { x: 10, y: 10 },
    { x: 10, y: 30 },
    { x: 10, y: 50 },
    { x: 10, y: 70 },
    { x: 40, y: 70 }
  ]
];

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
      console.log("Received start send pose for order ID:", orderId);

      // TODO: Put this simulation in the "start auto mode" controller
      timer = setInterval(async () => {
        // Fetch current pose for robot with orderId
        const order = await Order.findById(orderId);
        const robot = await Robot.findOne({
          where: {
            orderId
          }
        });
        if (robot.length === 0) return;
        const currentPath = paths[order.userId];
        const { x, y } = currentPath[robot.poseIndex];
        if (robot.poseIndex === currentPath.length - 1) {
          order.deliveryStatus = "Closed";
          await order.save();
          robot.poseIndex = 0;
          robot.status = "Available";
          await robot.save();
          socket.emit("update", { x, y, status: "Arrived" });
          clearInterval(timer);
          return;
        }
        socket.emit("update", { x, y, status: "On the way" });
        robot.poseIndex++;
        await robot.save();
      }, 1000);
    });
  });
};
