import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteData } from '../../../redux/slices/CustomerSlice'
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from "../../../api_config";



export default function DeleteCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => navigate('/customers');

  const id = window.location.pathname.split('/')[3]

  const handleSave = async () => {
    // e.preventDefault()
    try {
      await axios.delete(`${API_URL}/user/deleteUser/${id}`)
      dispatch(deleteData(id))
      navigate("/customers")
      toast.success('Successfully Deleted', {
        position: "top-right",
        theme: "colored"
      })
    }
    catch (error) {
      toast.error(error, {
        position: "top-right",
        theme: "colored"
      })
    }
  }


  
  const handleDelete = async (id) => {
    try {
      console.log(id)


    } catch (error) {
      toast.error(error.message)
    }

  }





  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            Are You Sure Want To Delete This User ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}