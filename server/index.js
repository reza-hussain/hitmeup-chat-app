const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io')
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js')

mongoose.connect('mongodb://0.0.0.0/test', { useNewUrlParser: true})

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to Database"))

const app = express();

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3001

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"]
    }
})

//=========================== SOCKET IO =================================//

io.on('connection', (socket) => {
    console.log(`User Connected`, socket.id)

    socket.on("join-room", (roomId) => {
        socket.join(roomId)
        console.log('Joined', roomId)
    })

    socket.on("send_message", (data) => {
       socket.to(data.room).emit("receive_message", data)
    })
})



app.get('/', (req, res) => {
    res.send("Welcome to Chat API")
}) 


app.use('/test', routes)


server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})