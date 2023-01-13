const express = require('express')
const userControllers = require('../controllers/userControllers.js')
const chatControllers = require('../controllers/chatControllers.js')

const router = express.Router();

router.post('/login',  userControllers.login)
router.get('/users',  userControllers.getUsers)
router.patch('/addChat', userControllers.addChat)
router.get('/users/:email', userControllers.getChatById)
router.delete('/deleteAll', userControllers.deleteAllUsers)

router.post('/newChat', chatControllers.newChat)
router.get('/chats', chatControllers.getAllChats)

module.exports = router