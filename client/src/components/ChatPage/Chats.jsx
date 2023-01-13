
import React from 'react'

import { useStateValue } from "../../context/ContextProvider"
import { useState } from "react"
import { useEffect } from "react"

import ChatInput from './ChatInput'

const Bubble = ({message}) => (
  <div className={`w-fit max-w-[250px] p-2 text-sm rounded-lg ${message.fromSelf === true ? 'bg-black text-white ml-auto rounded-bl-none' : 'bg-slate-500 text-white mr-auto rounded-br-none'}`}>
    <p>{message.message}</p>
  </div>
)

const Chats = ({socket}) => {
  const [{currentRoom}] = useStateValue()

  const [messageSent, setMessageSent] = useState([])
  const [messageReceived, setMessageReceived] = useState([])
  const [typingStatus, setTypingStatus] = useState()
  const [allMessages, setAllMessages] = useState([])


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived({fromSelf: false, message: data.message})
      console.log('message received')
    })
    
    if(messageReceived.message !== undefined){
      let tempMessage = [...allMessages]
      tempMessage.push({fromSelf: messageReceived.fromSelf, message: messageReceived.message})
      setAllMessages(tempMessage)
      setMessageReceived('')
    }
    
  }, [socket, messageReceived])

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus("typing..."))
  },[typingStatus])
  
  return(
    <>
    {currentRoom !== ''? (
    <div className="w-[80%] relative">
      {/* --------------------CHAT HEADER-------------------- */}
      <div className="w-full bg-[#343434] text-white p-5 absolute top-0">
        <p>{currentRoom.name}</p>
        <p className="text-xs italic">{currentRoom.id}</p>
      </div>

      <div className="w-full bg-white flex flex-col py-12 px-3 h-full mt-[50px]">
        {allMessages.length > 0 && allMessages.map((message, key) => (
          <div key={key} className="w-full py-2">
            <Bubble message={message} />
          </div>
        ))}
      </div>
      {typingStatus && <div>{typingStatus}</div>}
      <ChatInput allMessages={allMessages} setAllMessages={setAllMessages} socket={socket} messageSent={messageSent} setMessageSent={setMessageSent} />
    </div>
  ):(
    <div className="w-[80%] relative bg-white flex">Please select a chat or Create a new one</div>
  )}
    </>
  )
}

export default Chats