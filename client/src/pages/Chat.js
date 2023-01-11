import React from 'react'
import io from 'socket.io-client'
import axios from "axios"
import { ChatList, Chats } from '../components/ChatPage' 


const socket = io.connect("http://localhost:3001")


const Chat = ({url}) => {
  return (
    <div className="flex h-full">
      <ChatList url={url} socket={socket} />
      <Chats url={url} socket={socket} />
    </div>
  )
}

export default Chat