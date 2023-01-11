import { useState } from 'react'

import { ActionTypes } from '../../context/reducer'
import {useStateValue} from '../../context/ContextProvider'


const ChatList = ({socket, url}) => {
  const [{userChats, allRooms}, dispatch] = useStateValue()


  const [newChat, setNewChat] = useState("")
  const [activeChat, setActiveChat] = useState([])
  const [chatModal, setChatModal] = useState(false)
  const [joinModal, setJoinModal] = useState(false)
  const [error, setError] = useState("")

  const signedInUser = JSON.parse(localStorage.getItem("userData")).email

  url.get(`/chatsById/${signedInUser}`, {
  }).then((res) => {
    dispatch({
      type: ActionTypes.SET_CHATS,
      userChats: res.data.chats
    })
  })

  url.get('/chats').then((res) => {
    dispatch({
      type: ActionTypes.SET_ALL_CHATS,
      allRooms: res.data
    })
  })


  const createChat = async (e) => {
    e.preventDefault()

    if(newChat !== ""){
      const existingIDs = userChats.map((room) => room.id)
      console.log(existingIDs)
      const chat = {
        id: Math.floor(Math.random()*1000000),
        name: newChat
      }

      while(existingIDs.find((id) => id === chat.id)){
        chat.id = Math.floor(Math.random()*1000000)
      }

      url.post('/newChat', {
        id: chat.id,
        name: newChat
      }).then(() => {
        console.log("Chat Pushed to Database")
      })
      

      url.patch('/addChat', {
        email: JSON.parse(localStorage.getItem("userData")).email,
        chats: chat
      }).then(() => {
        setActiveChat(chat)

        dispatch({
          type: ActionTypes.SET_CURRENT_CHAT,
          currentRoom: {...chat}
        })
      })

      
      setChatModal(false)
      // setNewChat("")
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
    e.preventDefault();
    
    const chatToJoin = allRooms.filter((room) => room.id === parseInt(newChat))
    
    
    if(chatToJoin){
      const chat = userChats.filter((chat) => chat.id === chatToJoin[0].id)
      if(chat){
        setError("Chat already exists")
      }
      else{
        url.patch('/addChat', {
          email: signedInUser,
          chats: chat[0]
        })
      }
    }

    
  }

  const selectChat = (chat) => {
    setActiveChat(chat)

    dispatch({
      type: ActionTypes.SET_CURRENT_CHAT,
      currentRoom: chat
    })

    socket.emit('join-room', chat.id)
  }
   
  return (
    <div className="w-[25%] bg-[#CACACA] h-full relative">
      <div className="flex justify-between mb-4 p-5 h-[12%]">
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
      

      <ul className="flex flex-col justify-start items-start gap-4 overflow-scroll h-[80%]">
        {userChats.length ? userChats.map((chat, key) => (
          <li key={key} className={`px-4 py-6 w-full ${activeChat.id === chat.id ? 'bg-[#343434] text-white' :'bg-transparent text-[#343434]'} cursor-pointer`} onClick={() => {selectChat(chat)}}>{chat.name}</li>
        )): (
          <div>
            No Chats here. Please Join or create a new chat
          </div>
        )}
      </ul>
      
      <button className="w-full bg-black text-white py-2 absolute bottom-0 h-[8%]">Delete All Chats</button>
    </div>
  ) 
}


const ChatModel = ({setNewChat, createChat, setJoinModal, error}) => {
  
  return(
    <form className="w-full flex flex-col justify-center items-start p-4 gap-4 bg-[#343434] absolute">
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
    <form className="w-full flex flex-col justify-center items-start p-4 gap-4 bg-[#343434] absolute">
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

export default ChatList