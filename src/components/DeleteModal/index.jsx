import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
    const { show, onCancel, onConfirm} = props;
  return (
    <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton></Modal.Header> 
    <Modal.Body>
    Are you sure you want to delete this item?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onConfirm}>         
        OK
      </Button>
      <Button variant="primary" onClick={onCancel}>
        CANCEL
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteModal