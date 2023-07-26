const {
    Server
} = require("socket.io");

module.exports = function launchSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
        perMessageDeflate: false,
    });

    io.on("connection", socket => {
        console.info("A socket user has connected.");

        // Listen for new message type called `notification`
        // emit notifications for `login` and `logout` events

        socket.on("notification", data => {
            console.log(data);
        });

        // Join Notification : <User> joined <room name> @ <datetime>
        socket.on("join room", roomName => {
            socket.join(roomName);
            socket.emit("joined room", `<User> joined room ${roomName} @ ${new Date().toISOString()}`);
        });

        socket.on("chat message", msg => {
            console.log(`Message from socket client: ${msg.text}`);
            if (!msg) return;

            try {
                io.emit("chat message", msg);
            } catch (err) {
                console.error(err);
            }
        });

        socket.on("disconnect", () => {
            console.warn("A socket user has disconnected.");
        });
    });
}