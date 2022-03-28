import React, { useState, useEffect } from 'react'

import AddModal from '../components/AddModal'
import SearchData from '../components/SearchData';
import TodolistTable from '../components/TodolistTable'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './index.module.scss'
import SuccessAddModalMsg from '../components/SuccessAddModalMsg'


const Home = (props) => {
  // const { status, setStatus } = props;

  const [addModalVisible, setAddModalVisible] = useState(false);
  const handleClose = () => setAddModalVisible(true);

  const [todolist, setTodolist] = useState([])
  const [updateData, setUpdateData] = useState(null)
  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false)
  const [filteredTodoList, setFilteredTodoList] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [statusKeyword, setStatusKeyword] = useState('')
  const [toasterVisible, setToasterVisible] = useState(false)

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
    setAddModalVisible(false)
    setToasterVisible(true)
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
    setAddModalVisible(false)
  }

  //search on input (onchange)
  const setSearch = (keyword) => {
    setSearchKeyword(keyword)
    //todo list filter
    // set state ng todo list
    const searchResults = todolist.filter((todo) => {
      const { title, description, status } = todo;
      if (
        title.toLowerCase().includes(keyword.toLowerCase())
        || description.toLowerCase().includes(keyword.toLowerCase())

      ) {
        return todo;
      }
      return null
    });
    //set state
    setFilteredTodoList(searchResults)
  }

  // search handle select for status change
  const searchByStatus = (event) => {
    const value = event.target.value
    let searchResults = []
    if (value === 'ALL') {
      searchResults = todolist
    } else {
      searchResults = todolist.filter((todo) => todo.status === value)
    }
    setFilteredTodoList(searchResults)
  }


  const handleOnSort = (sortedData) => {
    setFilteredTodoList(sortedData)
  }

  const handleOnToastClose = () => {
    setToasterVisible(false)
  }

  return (
    <div className={styles.homeMain}>
      <div className={styles.filterSection}>
        <Button className={styles.addBtn} onClick={handleClose}>Add Item</Button>
        <SearchData
          searchKeyword={searchKeyword}
          setSearch={setSearch}
          // setStatus={setStatus}
          handleSelect={searchByStatus}
        />
      </div>

      <TodolistTable
        todolist={filteredTodoList}
        onDelete={deleteTodo}
        setIsUpdateModalShow={setAddModalVisible}
        setUpdateData={setUpdateData}
        isSearching={searchKeyword.length}
        handleOnSort={handleOnSort}
      />



      {addModalVisible &&
        <AddModal
          show={addModalVisible}
          setShow={setAddModalVisible}
          addTodoList={addTodoList}
          onUpdate={updateTodo}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      }
      <SuccessAddModalMsg show={toasterVisible} onToastClose={handleOnToastClose} />

    </div>
  )
}

export default Home