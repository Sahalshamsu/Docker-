import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Students from './components/Students'
import Project from './components/Project'
import ChatPage from './components/ChatPage'

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/Students' element={<Students/>}></Route>
        <Route path='/Project' element={<Project />}></Route>
        <Route path='/Chat' element={<ChatPage/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
