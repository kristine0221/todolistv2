import React, { useState, useEffect } from 'react'

import AddModal from '../components/AddModal'
import SearchData from '../components/SearchData';
import TodolistTable from '../components/TodolistTable'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './index.module.scss'


const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(true);

  const [todolist, setTodolist] = useState([])
  const [updateData, setUpdateData] = useState(null)
  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false)
  const [filteredTodoList, setFilteredTodoList] = useState([])

  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    const getTodolist = async () => {
      const todolistFromServer = await fetchTodolist()

      setTodolist(todolistFromServer)
    }
    getTodolist()
  }, [])

  useEffect(() => {
    setFilteredTodoList(todolist)
  }, [todolist])


  //Fetch todolist from json
  const fetchTodolist = async () => {
    const res = await fetch('http://localhost:5000/todolist')
    const data = await res.json()
    return data
  }

  //add todos
  const addTodoList = async (todos) => {
    const res = await fetch('http://localhost:5000/todolist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todos),
    })
    const data = await res.json()
    setTodolist([...todolist, data])
    setShow(false)
  }

  //Delete todos
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todolist/${id}`, {
      method: 'DELETE'
    })
    setTodolist(todolist.filter((todo) => todo.id !== id))
  }

  //Update todos
  const updateTodo = async (id, todo) => {
    const res = await fetch(`http://localhost:5000/todolist/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),

    })
    const data = await res.json();
    setTodolist([...todolist.map(todo => {
      if (todo.id === id) {
        return data
      }
      return todo
    })])
    setShow(false)
  }

  //search todos
  //  const searchTodoList = async (todoTitle, todoDescription) => {
  //   const res = await fetch('http://localhost:5000/todolist?todoTitle=${todoTitle}&todoDescription=${{', {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(todos),
  //   })
  //   const data = await res.json()
  //   setSearch(res.data)
  // }

  const setSearch = (keyword) => {
    setSearchKeyword(keyword)
    //todo list filter
    // set state ng todo list
    const searchResults = todolist.filter((todo) => {
      const { title, description } = todo;
      if (title.toLowerCase().includes(keyword.toLowerCase()) || description.toLowerCase().includes(keyword.toLowerCase())) {
        return todo;
      }
      return null
    });
    //set state
    setFilteredTodoList(searchResults)
  }

  const handleOnSort = (sortedData) => {
    setFilteredTodoList(sortedData)
  }

  console.log({ filteredTodoList })

  return (
    <div className={styles.homeMain}>
      <Button onClick={handleClose}>Add Item</Button>
      {show &&
        <AddModal
          show={show}
          setShow={setShow}
          addTodoList={addTodoList}
          onUpdate={updateTodo}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      }
      <SearchData
        searchKeyword={searchKeyword}
        setSearch={setSearch}
      />
      <TodolistTable
        todolist={filteredTodoList}
        onDelete={deleteTodo}
        setIsUpdateModalShow={setShow}
        setUpdateData={setUpdateData}
        isSearching={searchKeyword.length}
        handleOnSort={handleOnSort}
      />
    </div>
  )
}

export default Home