import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
// import { useForm } from "react-hook-form";
import moment from 'moment'
import styles from './index.module.scss'
import SuccessAddModalMsg from '../SuccessAddModalMsg'

const AddModal = (props) => {
  //form validation
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  //form validation onSubmit
  // const onSubmit = data => alert(JSON.stringify(data));
  const { setShow, show, addTodoList, updateData, setUpdateData, onUpdate } = props;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('Completed')
  const [error, setError] = useState({})
  const [ minDate, setMinDate ] = useState(null)
  const [disableBtn, setDisableBtn] = useState(true)
  

  
  // const handleSubmit = (e) =>{
  //   e.preventDefault();
  // }

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

  //input Onchange for validation
  const handleOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
  
    //getting value for validation function
    if (name === 'title') {
      setTitle(value)
    }
    if (name === 'description') {
      setDescription(value)
    }
    if (name === 'dateStart'){
      setStartDate(value)
    }
    if (name === 'dateEnd'){
      setEndDate(value)
    }
    onValidation(name, value)
  }

  // disable and enable button
  // const disableEnableBtn = (value) => {
  //   if (value.length > 0){
  //     setDisableBtn({
  //       ...disableBtn, true
  //     })
  //   }
  // }
  // console.log(disableEnableBtn, "value of disable button")

  const onValidation = (name, value) => {
    if (name === 'title') {
      if (value.length >= 5) {
        setError({
          ...error,
          title: "Value should be less than 10"
        })
      } 
      else {
        setError({
          ...error,
          title: ""
        })
      }
    }
    if (name === 'description'){
      if (value.length >=5){
        setError({
          ...error,
          description: "Value should be less than 20"
        })
      } 
      else {
        setError({
          ...error,
          description: ""
        })
      }

    }
    //wala na rin silbi to since gumawa na ko useeffect that can disable past date. 
    if (name === 'dateStart'){
      const date = moment().format('MMMM DD YYYY, h:mm a')
      const formattedDate = moment(value).format('MMMM DD YYYY, h:mm a')
      console.log({ date, formattedDate})
      // console.log(formattedDate, 'input date') //from start input 
      // console.log(moment(date).format('MMMM DD YYYY, h:mm:ss a'), 'todays date')
      if (formattedDate < date){ 
        setError({
          ...error,
          dateStart: "Value should not be past date"
        })
      } else {
        setError({
          ...error,
          dateStart: ""
        })
      }
    }
    if (name === 'dateEnd'){
      const formattedDate = moment(value).format('MMMM DD YYYY, h:mm a')
      const formattedStartDate = moment(startDate).format('MMMM DD YYYY, h:mm a')
      console.log(formattedStartDate, 'input date ng start') //from start input 
      console.log(moment(formattedDate).format('MMMM DD YYYY, h:mm:ss a'), 'input date ng end')
      if (formattedDate <= formattedStartDate){ 
        setError({
          ...error,
          dateEnd: "Value should not be the same or ahead of start date"
        })
      } else {
        setError({
          ...error,
          dateEnd: ""
        })
      }
    }
  }

 
  useEffect(() => {
    const min_date = new Date()
    setMinDate(moment(min_date).format('YYYY-MM-DDThh:mm'))
  }, [])

  // useEffect(() => {
  //   const errors = Object.values(error)
  //   console.log({errors})
  //   if(errors.length) {
  //     if (errors.some(err => !!err)) {
  //       setDisableBtn(true)
  //     }
  //   } else {
  //     setDisableBtn(false)
  //   }
  // }, [error])

  useEffect(() => {
    const errors = Object.values(error)
    if(title === '' || description === '' || startDate === '' || endDate === '') {
      setDisableBtn(true)
    } else {
      setDisableBtn(false)

      if(errors.some(err => !!err)) {
        setDisableBtn(true)
      } 
    }
  }, [ error, title, description, startDate, endDate ])

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    // <form onSubmit={handleSubmit}> 
  
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
                min={ minDate }
                value={startDate}
                onChange={handleOnChange}
              />
             {error.dateStart && <p>{error.dateStart}</p>}
            </div>
            <div className={styles.inputWrapper}>Date/Time (end):
              <input className={styles.inputTxtBox}
                name='dateEnd'
                type="datetime-local"
                value={endDate}
                onChange={handleOnChange}
              />
              {error.dateEnd && <p>{error.dateEnd}</p>}
            </div>
            <div className={styles.inputWrapper}>Status:
              <select className={styles.inputTxtBox}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                {/* <option value="Expired">Expired</option> */}
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
            <Button variant="primary" onClick={handleAddTodo} disabled={disableBtn}>
              ADD ITEM
            </Button>
          }
        </Modal.Footer>
      </Modal>

  )
}

export default AddModal