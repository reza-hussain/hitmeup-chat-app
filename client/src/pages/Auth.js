import { useState } from "react"

import { ActionTypes } from '../context/reducer'

import {useStateValue} from '../context/ContextProvider'
import { useNavigate } from "react-router-dom"

const Auth = ({url}) => {
  
  const [{userInfo},dispatch] = useStateValue()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  
  const Navigate = useNavigate()

  const onSubmit = () => {
    if(email !== '' && password !== ''){
      setError(false)
      const user = {
        email,
        password,
      }

      dispatch({
        type: ActionTypes.SET_USER,
        userInfo: user  
      })

      
      url.post('/login', {
        email: user.email,
        password: user.password
      })
      .then(() => {
        localStorage.setItem("userData", JSON.stringify(user))
        Navigate('/chats')
      })

    }
    else{
      setError(true)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-gray-200">
      <form className="flex flex-col gap-3 drop-shadow-md p-10 border-2 border-gray-300 rounded-sm" onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text"
        placeholder="Username"
        className="p-3 bg-transparent border-b-2 border-gray-400 outline-none"
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
        type="password" 
        placeholder="Password" 
        className="p-3 bg-transparent border-b-2 border-gray-400 outline-none"
        onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={onSubmit} className="px-5 py-3 bg-gray-800 rounded-sm text-white">Log In</button>
      </form>
      <p className={`py-2 text-red-600 ${error ? 'block' : 'hidden'}`}>Invalid Credentials</p>
    </div>
  )
}

export default Auth