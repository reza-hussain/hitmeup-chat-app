const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Chats", ChatSchema)