const { Server } = require("socket.io");

// Export a function that initializes Socket.IO
module.exports = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle private messages
    socket.on('private message', async (data) => {
      try {
        // Handle private message logic here
        console.log('Private message received:', data);
      } catch (error) {
        console.error("Error during sending private message:", error);
        // Handle error response
        io.to(socket.id).emit('private message', {
          error: "Internal server error",
        });
      }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
