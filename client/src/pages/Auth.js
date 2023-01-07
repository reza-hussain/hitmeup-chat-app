import { useState } from "react"

import { ActionTypes } from '../context/reducer'

import {useStateValue} from '../context/ContextProvider'
import { useNavigate } from "react-router-dom"

const Auth = () => {
  
  const [{userInfo}, dispatch] = useStateValue()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [chat, setChat] = useState("")

  // For routing to another page after sign in
  const Navigate = useNavigate();

  const onSubmit = () => {
    const user = {
      username,
      password,
      chat
    }
    dispatch({
      type: ActionTypes.SET_USER,
      userInfo: user  
    })

    Navigate('/chat')
    // localStorage.setItem("user", user)
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <form className="flex flex-col gap-3 drop-shadow-md p-10 border-2 border-gray-300 rounded-sm" onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text"
        placeholder="Username"
        className="p-3 bg-transparent border-b-2 border-gray-400 outline-none"
        onChange={(e) => setUsername(e.target.value)}
        />
        
        <input 
        type="password" 
        placeholder="Password" 
        className="p-3 bg-transparent border-b-2 border-gray-400 outline-none"
        onChange={(e) => setPassword(e.target.value)}
        />

        <input 
        type="text" 
        placeholder="Enter Chat Name" 
        className="p-3 bg-transparent border-b-2 border-gray-400 outline-none"
        onChange={(e) => setChat(e.target.value)}
        />

        <button onClick={onSubmit} className="px-5 py-3 bg-gray-800 rounded-sm text-white">Log In</button>
      </form>
    </div>
  )
}

export default Auth