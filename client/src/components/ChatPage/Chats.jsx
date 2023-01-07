import React from 'react'
import { useStateValue } from "../../context/ContextProvider"

const SendBubble = () => (
  <div className="max-w-[250px] p-2 bg-black text-white text-sm ml-auto rounded-lg rounded-bl-none">
    <p>Creating new applications using React and Node.js always requires a certain amount of work before you actually start working on the final solution.</p>
  </div>
)

const ReceiveBubble = () => (
  <div className="max-w-[250px] p-2 bg-slate-500 text-white text-sm mr-auto rounded-lg rounded-br-none">
    <p>Creating new applications using React and Node.js always requires a certain amount of work before you actually start working on the final solution.</p>
  </div>
)

const Chats = () => {
  const [{currentChat}] = useStateValue()

  return(
    <>
    {currentChat !== '' ? (
    <div className="w-[80%] relative">
      {/* --------------------CHAT HEADER-------------------- */}
      <div className="w-full bg-[#343434] text-white p-5 absolute top-0">{currentChat }</div>

      <div className="w-full bg-white flex flex-col py-12 px-3 h-full mt-[50px]">
        <SendBubble />
        <ReceiveBubble />
      </div>

      <div className="w-full flex justify-start items-center bg-slate-100 mt-auto border border-black absolute bottom-0">
        <input type="text" className="w-full px-3 py-2 outline-none" placeholder="Type your message here..." />
        <button className="px-8 py-2 bg-black text-white outline-none">Send</button>
      </div>
    </div>
  ):(
    <div className="w-[80%] relative bg-white flex"></div>
  )}
    </>
  )
}

export default Chats