import React from 'react'
import { Route, Routes } from "react-router-dom"

import Auth from "./pages/Auth"
import Chat from "./pages/Chat"

const App = () => {
  return (
    <div className="flex border-2 justify-center items-center h-screen 2xl:bg-gray-500">
      <div className="w-screen 2xl:w-[1366px] 2xl:h-[768px] h-screen 2xl:rounded-lg overflow-hidden">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
