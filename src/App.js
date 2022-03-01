import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Components
import Home from './core/Home'

const App = () => {

  return (
    <div className='app-main'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      {/* <TodolistTable todolist={todolist} />
      <AddModal addTodoList={() => { }} /> */}
    </div>
  )
}

export default App