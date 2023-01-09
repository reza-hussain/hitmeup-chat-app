const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io')
const http = require('http');

const app = express();

const PORT = process.env.PORT || 3001

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"]
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected`, socket.id)

    socket.on("join-room", (roomId) => {
        socket.join(roomId)
        console.log('joined')
    })

    socket.on("send_message", (data) => {
       socket.to(data.room).emit("receive_message", data)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})