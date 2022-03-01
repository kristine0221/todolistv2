import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import styles from './index.module.scss'

const AddModal = (props) => {
  const { setShow, show, addTodoList, updateData, setUpdateData, onUpdate } = props;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('Completed')
  const [error, setError] = useState({})

  useEffect(() => {
    if (Object.keys(updateData || {}).length !== 0) {
      setTitle(updateData.title)
      setDescription(updateData.description)
      setStartDate(updateData.dateTime.start)
      setEndDate(updateData.dateTime.end)
      setStatus(updateData.status)
    }

    return () => setUpdateData(null)
  }, [updateData, setUpdateData])

  const handleAddTodo = () => {
    const newTodo = {
      title: title,
      description: description,
      dateTime: {
        start: startDate,
        end: endDate,
      },
      status: status
    }
    addTodoList(newTodo)
  }

  const handleOnUpdate = () => {
    const updateTodo = {
      title: title,
      description: description,
      dateTime: {
        start: startDate,
        end: endDate,
      },
      status: status
    }
    onUpdate(updateData.id, updateTodo)
  }

  //input Onchange
  const handleOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    if (name === 'title') {
      setTitle(value)
    }
    if (name === 'description') {
      setDescription(value)
    }
    onValidation(name, value)
  }

  //validation
  const onValidation = (name, value) => {
    if (name === 'title') {
      if (value.length >= 5) {
        setError({
          ...error,
          title: "Value should be less than 5"
        })
      } else {
        setError({
          ...error,
          title: ""
        })
      }
    }
    if (name === 'description'){
      if (value.length >=10){
        setError({
          ...error,
          description: "Value should be less than 10"
        })
      } else {
        setError({
          ...error,
          description: ""
        })
      }
    }
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.addItemContainer}>
          <div className={styles.inputWrapper}>Title:
            <input className={styles.inputTxtBox}
              name='title'
              type='text'
              value={title}
              onChange={handleOnChange}
            />
            {error.title && <p>{error.title}</p>}
          </div>
          <div className={styles.inputWrapper}>Description:
            <input className={styles.inputTxtBox}
              name='description'
              type='text'
              value={description}
              onChange={handleOnChange}
            />
            {error.description && <p>{error.description}</p>}
          </div>
          <div className={styles.inputWrapper}>Date/Time (start):
            <input className={styles.inputTxtBox}
              name='dateStart'
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>Date/Time (end):
            <input className={styles.inputTxtBox}
              name='dateEnd'
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>Status:
            <select className={styles.inputTxtBox}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Expired">Expired</option>
              <option value="Deleted">Deleted</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {Object.keys(updateData || {}).length > 0 ?
          <Button variant="primary" onClick={handleOnUpdate}>
            UPDATE ITEM
          </Button> :
          <Button variant="primary" onClick={handleAddTodo}>
            ADD ITEM
          </Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default AddModal