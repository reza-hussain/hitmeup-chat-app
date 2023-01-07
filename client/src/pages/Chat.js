import React from 'react'

import { ChatList, Chats } from '../components/ChatPage' 

const Chat = () => {
  return (
    <div className="flex h-full">
      <ChatList />
      <Chats />
    </div>
  )
}

export default Chat