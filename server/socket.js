const { Server } = require("socket.io");
const server = require("./server");

(() => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    },
    perMessageDeflate: true
  });

  io.on("connection", (socket) => {
    console.info("A socket user has connected.");

    // On connection, join the main room `central`
    socket.join("central");

    socket.on("chat message", (msg) => {
      console.log(`Message from socket client: ${msg}`);
      if (!msg) return;

      try {
        socket.broadcast.emit("chat message", msg);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      console.warn("A socket user has disconnected.");
    });
  });
  return io;
})();
