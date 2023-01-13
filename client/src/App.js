import React from 'react'
import { Route, Routes } from "react-router-dom"
import axios from 'axios'

import Auth from "./pages/Auth"
import Chat from "./pages/Chat"

const url = axios.create({
  baseURL: 'http://localhost:3001/test'
})
const App = () => {
  return (
    <div className="flex justify-center items-center h-screen 2xl:bg-gray-500">
      <div className="w-screen 2xl:w-[1366px] 2xl:h-[768px] h-screen 2xl:rounded-lg overflow-hidden">
        <Routes>
          <Route path="/" element={<Auth url={url}/>} />
          <Route path="/chats" element={<Chat url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
