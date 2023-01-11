const ChatSchema = require('../schema/ChatSchema.js')

const newChat = async (req, res) => {
    const chat = await ChatSchema.create({
        id: req.body.id,
        name: req.body.name,
    }) 
    

    try{
        const newChat = await chat.save()
        res.status(200).json(newChat)
    }
    catch(err){
        res.status(400).send(err.message)
    }
}

const getAllChats = async (req, res) => {
    try{
        const chats = await ChatSchema.find()
        res.json(chats)
    }
    catch(err){
        res.status(400).send(err.message)
    }
}



module.exports = {
    newChat,
    getAllChats
}