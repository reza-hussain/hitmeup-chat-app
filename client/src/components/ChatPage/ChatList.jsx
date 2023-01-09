import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

import { ActionTypes } from '../../context/reducer'
import {useStateValue} from '../../context/ContextProvider'



const ChatModel = ({setNewChat, createChat, setJoinModal, error}) => {
  
  return(
    <form className="w-full flex flex-col justify-center items-start p-4 gap-4 bg-[#343434]">
      <input type="text" id="createChat" placeholder="Enter Chat Name"
      className="text-xl outline-none bg-transparent text-white"
      onChange={(e) => setNewChat(e.target.value)}
      onSubmit={(e)=> e.preventDefault()}
      onKeyDown={(e) => e.code === "Enter" && createChat()}
      />
      

      <button className="bg-[black] p-3 flex justify-center items-center text-white outline-none" onClick={createChat}>Create Chat</button>
      {error && (<p className="text-red-600 font-semibold text-sm italic">{error}</p>)}
    </form>
  )
}

const JoinModal = ({ setNewChat, joinChat, error}) => {
  return(
    <form className="w-full flex flex-col justify-center items-start p-4 gap-4 bg-[#343434]">
      <input type="text" id="createChat" placeholder="Enter Chat ID"
      className="text-xl outline-none bg-transparent text-white"
      onChange={(e) => setNewChat(e.target.value)}
      onSubmit={(e)=> e.preventDefault()}
      onKeyDown={(e) => e.code === "Enter" && joinChat()}
      />
      

      <button className="bg-[black] p-3 flex justify-center items-center text-white outline-none" onClick={joinChat}>Join Chat</button>
      {error && (<p className="text-red-600 font-semibold text-sm italic">{error}</p>)}
    </form>
  )
}



const ChatList = ({socket}) => {
  const [{allRooms}, dispatch] = useStateValue()


  const [newChat, setNewChat] = useState("")
  const [activeChat, setActiveChat] = useState("")
  const [chatModal, setChatModal] = useState(false)
  const [joinModal, setJoinModal] = useState(false)
  const [error, setError] = useState("")

  const chats = allRooms


  const createChat = (e) => {
    e.preventDefault()

    if(newChat !== ""){
      const chat = {
        id: Math.floor(Math.random()*1000000),
        name: newChat,
        date: Date.now()
      }
      // APPEND THE ALL ROOMS STATE ARRAY WITH THE NEW CREATED ROOM
      dispatch({
        type: ActionTypes.CREATE_CHAT,
        allRooms: [...allRooms, chat]
      })
  
      // SET THIS CHAT AS THE CURRENTLY OPENED CHAT
      setActiveChat(chat.id)
      
      dispatch({
        type: ActionTypes.SET_CURRENT_CHAT,
        currentRoom: [chat] 
      })

      socket.emit("join-room", chat.id)


      setChatModal(false)
      setNewChat("")
      setError("")
    }

    else{
      setError("Chat must have a name")
      setTimeout(() => {
        setError("")
      }, 2000)
    }
  }

  const joinChat = (e) => {
    console.log(newChat)
    e.preventDefault()

    if(newChat !== ""){
      
      // const chat = allRooms.filter((room) => room.id === newChat)

        socket.emit('join-room', newChat)

      // else{
      //   setError("Invalid Join ID")
      //   setTimeout(() => {
      //     setError("")
      //   }, 2000)
      // }
      
      
    }
    else{
      setError("Invalid Join ID")
      setTimeout(() => {
        setError("")
      }, 2000)
    }

  }

  const selectChat = (props) => {
    setActiveChat(props)

    dispatch({
      type: ActionTypes.SET_CURRENT_CHAT,
      currentRoom: props
    })
  }
   
  return (
    <div className="w-[25%] bg-[#CACACA] h-full ">
      <div className="flex justify-between mb-4 p-5">
        <h2 className="text-2xl font-bold">Chats</h2>
        <div className="flex gap-2">
          <button className="text-sm bg-black w-[65px] h-[30px] flex justify-center items-center text-white rounded-full"
          onClick={() => {setChatModal(false); setJoinModal(!joinModal)}}
          >Join</button>
          <button className="text-sm bg-black w-[65px] h-[30px] flex justify-center items-center text-white rounded-full"
          onClick={() => {setChatModal(!chatModal); setJoinModal(false)}}
          >New +</button>
        </div>
        
      </div>

      {chatModal && (<ChatModel setNewChat={setNewChat} createChat={createChat} error={error}/>)}
      {joinModal && (<JoinModal setNewChat={setNewChat} joinChat={joinChat} error={error}/>)}
      

      <ul className="flex flex-col justify-start items-start gap-4">
        {chats && chats.map((chat, key) => (
          <li key={key} className={`px-4 py-6 w-full ${activeChat === chat.id ? 'bg-[#343434] text-white' :'bg-transparent text-[#343434]'} cursor-pointer`} onClick={() => {selectChat(chat.id)}}>{chat.name}</li>
        ))}
      </ul>
    </div>
  ) 
}

export default ChatList