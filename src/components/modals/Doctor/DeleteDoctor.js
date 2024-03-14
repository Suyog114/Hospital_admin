import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteDoctorData } from '../../../redux/slices/DoctorSlice'
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from "../../../api_config";



export default function DeleteDoctor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => navigate('/doctors');

  const id = window.location.pathname.split('/')[3]

  const handleSave = async () => {
    // e.preventDefault()
    try {
      await axios.delete(`${API_URL}/doctor/deleteOneDoctor/${id}`)
      dispatch(deleteDoctorData(id))
      navigate("/doctors")
      toast.success('Successfully Deleted', {
        position: "top-right",
        theme: "colored"
      })
    }
    catch (error) {
      console.log(error)
      toast.error(error, {
        position: "top-right",
        theme: "colored"
      })
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
          <Modal.Title>Delete Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            Are You Sure Want To Delete This Doctor ?
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