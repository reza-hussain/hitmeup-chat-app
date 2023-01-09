import React from 'react'
import io from 'socket.io-client'
import { ChatList, Chats } from '../components/ChatPage' 

const socket = io.connect("http://localhost:3001")

const Chat = () => {
  return (
    <div className="flex h-full">
      <ChatList socket={socket} />
      <Chats socket={socket} />
    </div>
  )
}

export default Chat