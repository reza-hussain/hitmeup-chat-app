const mongoose = require('mongoose')
const ChatSchema = require('./ChatSchema.js').schema


const UserSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    chats:{
        type: [ChatSchema],
        default: []
    }
})

module.exports = mongoose.model("User", UserSchema)