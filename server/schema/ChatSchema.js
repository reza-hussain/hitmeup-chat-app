const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
    }

})

module.exports = mongoose.model("Chats", ChatSchema)