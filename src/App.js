import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Components
import Home from './core/Home'
import styles from './app.module.scss'

const App = () => {

  return (
    <div className={styles.homeMain}>
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