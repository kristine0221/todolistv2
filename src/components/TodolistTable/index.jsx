import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { GrEdit } from 'react-icons/gr';
import { TiDelete } from 'react-icons/ti';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

import DeleteModal from '../DeleteModal'
import AddModal from '../AddModal'


const TodolistTable = (props) => {
    const {
        todolist,
        onDelete,
        setUpdateData,
        setIsUpdateModalShow,
        isSearching,
        handleOnSort
    } = props;

    const [isDeleteModalShow, setIsDeleteModalShow] = useState(false)

    const [deleteID, setDeleteID] = useState(null)

    const handleIsDeleteModalShow = (id) => {
        setDeleteID(id)
        setIsDeleteModalShow(true)
    }

    const handleOnConfirmDelete = () => {
        onDelete(deleteID)
        setIsDeleteModalShow(false)
    }

    const handleOnCancelDelete = () => {
        setIsDeleteModalShow(false)
    }

    const handleOnClickEdit = (id) => {
        const data = todolist.find(list => list.id === id)

        setUpdateData(data)
        setIsUpdateModalShow(true)
    }

    //sorting asc
    const ascId = (sortType) => {
        let sortedTodolist = [];
        if(sortType === 'id') {
            console.log(1)
            sortedTodolist = [...todolist].sort((a, b) => {
                return a.id - b.id
            })
        }
        if (sortType === 'title'){
            console.log(2)
            sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.title < b.title ){
                    return -1;
                  }
                  if ( a.title > b.title ){
                    return 1;
                  }
                  return 0;
            })
        }
        if (sortType === 'description'){
            console.log(3)
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.description < b.description ){
                    return -1;
                  }
                  if ( a.description > b.description ){
                    return 1;
                  }
                  return 0;
            })
        }
       if (sortType === 'dateTimeStart'){
        sortedTodolist = [...todolist].sort((a, b) => {
            if ( a.dateTime.start < b.dateTime.start ){
                return -1;
              }
              if ( a.dateTime.start > b.dateTime.start ){
                return 1;
              }
              return 0;
        })
        }
        if (sortType === 'status'){
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.status < b.status ){
                    return -1;
                  }
                  if ( a.status > b.status ){
                    return 1;
                  }
                  return 0;
            })
        }

        handleOnSort(sortedTodolist)
        // setFilteredTodoList(sortedTodolist)
    }

    //sortDesc
    const descId = (sortType) => {
        let sortedTodolist = [];
        if(sortType === 'id') {
             sortedTodolist = [...todolist].sort((a, b) => {
                return b.id - a.id
            })
        }
        if(sortType === 'title') {
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.title > b.title ){
                    return -1;
                  }
                  if ( a.title < b.title ){
                    return 1;
                  }
                  return 0;
            })
        }
        if(sortType === 'description') {
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.description > b.description ){
                    return -1;
                  }
                  if ( a.description < b.description ){
                    return 1;
                  }
                  return 0;
            })
        }
        if(sortType === 'dateTimeStart') {
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.dateTime.start > b.dateTime.start ){
                    return -1;
                  }
                  if ( a.dateTime.start < b.dateTime.start ){
                    return 1;
                  }
                  return 0;
            })
        }
        if(sortType === 'status') {
             sortedTodolist = [...todolist].sort((a, b) => {
                if ( a.status > b.status ){
                    return -1;
                  }
                  if ( a.status < b.status ){
                    return 1;
                  }
                  return 0;
            })
        }
        
        
        handleOnSort(sortedTodolist)
        // setFilteredTodoList(sortedTodolist)
    }

    const renderTodoList =
        todolist
            .map((todo) =>
                <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td><p>{todo.dateTime.start}</p><p>{todo.dateTime.end}</p></td>
                    <td>{todo.status}</td>
                    <td>
                        <Button onClick={() => handleOnClickEdit(todo.id)}><GrEdit />Edit</Button>/
                        <Button onClick={() => handleIsDeleteModalShow(todo.id)}><TiDelete />Delete</Button>
                    </td>
                </tr>
            )


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID<BiUpArrow onClick={() => ascId('id')} /><BiDownArrow onClick={() => descId('id')} /></th>
                        <th>Title<BiUpArrow onClick={() => ascId('title')} /><BiDownArrow onClick={() => descId('title')} /></th>
                        <th>Description<BiUpArrow onClick={() => ascId('description')} /><BiDownArrow onClick={() => descId('description')} /></th>
                        <th>Date &amp; Time<BiUpArrow onClick={() => ascId('dateTimeStart')} /><BiDownArrow onClick={() => descId('dateTimeStart')} /></th>
                        <th>Status<BiUpArrow onClick={() => ascId('status')} /><BiDownArrow onClick={() => descId('status')} /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todolist.length ? renderTodoList : isSearching ? <tr><td colSpan="6">No results found!</td></tr> : <tr><td colSpan="6">No todo available!</td></tr>}
                </tbody>
            </Table>
            <DeleteModal show={isDeleteModalShow} onConfirm={handleOnConfirmDelete} onCancel={handleOnCancelDelete} />
        </div>
    )
}

export default TodolistTable