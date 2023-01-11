const mongoose = require('mongoose')


const UserSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    chats: {
        type: Array
    }
})

module.exports = mongoose.model("User", UserSchema)