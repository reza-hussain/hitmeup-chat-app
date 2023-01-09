import { useState } from "react";
import { useStateValue } from "../../context/ContextProvider";

const ChatInput = ({ allMessages, setAllMessages, socket}) => {

    // This is the input box component. The "message" records the e.target.value of the input box. when the send button
    // is clicked, it assigns that message value to the "messageSent" state variable that is then passed onto the Chats Component
    const[{currentRoom}] = useStateValue()
    const[message, setMessage] = useState('')

    const sendMessage = (e) => {
      
      if(message.length > 0){
        
        let tempMessage = [...allMessages]
        tempMessage.push({fromSelf: true, message: message})
        setAllMessages(tempMessage)
    
        document.getElementById('input').value=''

        socket.emit("send_message", {
          message: message,
          id: `${socket.id * Math.random(1000)}`,
          socketID: socket.id,
          fromSelf: true,
          room: currentRoom
        })

        setMessage('')
      }
    }
  
    return (
    
      <div className="w-full flex justify-start items-center bg-slate-100 mt-auto border border-black absolute bottom-0" tabIndex="0">
          <input id="input" type="text" className="w-full px-3 py-2 outline-none" placeholder="Type your message here..." onKeyDown={(e) => e.code === 'Enter' && sendMessage()} onChange={(e) => setMessage(e.target.value)} />
          <button className="px-8 py-2 bg-black text-white outline-none" onClick={sendMessage}>Send</button>
      </div>
  )}

  export default ChatInput