const UserSchema = require('../schema/UserSchema.js')
const ChatSchema = require('../schema/ChatSchema.js')

const login = async (req, res) => {
    const user = await UserSchema.create({
        email: req.body.email,
        password: req.body.password
    })

    try{
        const newUser = await user.save()
        res.status(200).json(newUser)
    }
    catch(err){
        res.status(400).send("Error Saving User : 400")
    }
}

const getUsers = async (req, res) => {
    try{
        const user = await UserSchema.find()
        res.json(user)
    }catch(err){
        res.status(500).send(err.message)
    }

}

const getChatById = async (req, res) => {
    try{
        const user = await UserSchema.findOne({email: req.params.email})
        res.json(user)
    }
    catch(err){
        res.status(400).send(err.message)
    } 
}

const addChat = async(req, res) => {
    try{
        const user = await UserSchema.updateOne({email: req.body.email}, {
            $push: {chats: {id: req.body.chats["id"], name: req.body.chats["name"]}}},
            {safe: true, upsert: true, new : true}
        )
        res.send(user) 
    }
    catch(err){
        res.status(400).send(err.message)
    }
}


const deleteAllUsers = async (req, res) => {
    try{
        await UserSchema.deleteMany()
        await ChatSchema.deleteMany()
        res.send("Deleted Successfully")
    }
    catch(err){
        res.send(err.message)
    }
}
 
module.exports = {
    login,
    getUsers,
    addChat,
    getChatById,
    deleteAllUsers
}