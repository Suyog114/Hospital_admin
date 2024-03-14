import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addData } from '../../../redux/slices/CustomerSlice'
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from "../../../api_config";



export default function AddCustomers() {
  const [customerData, setCustomerData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "user"
  })
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleClose = () => navigate('/customers');

  const handleSave = async () => {
    // e.preventDefault()
    try {
      if (customerData.name === "" || customerData.email === "" || customerData.password === "" || customerData.confirm_password === "") {
        toast.error("Fields Cannot Be Empty !", {
          position: "top-right",
          theme: "colored"
        });
      }
      else {
        const res = await axios.post(`${API_URL}/user/registerUser`, customerData)
        dispatch(addData({...customerData, id: res.data.id}))
        navigate("/customers")
        toast.success('Successfully Added', {
          position: "top-right",
          theme: "colored"
        })
      }
    }
    catch (error) {
      toast.error(error.response.data, {
        position: "top-right",
        theme: "colored"
      })
    }
  }


  const handleChange = (e) => {
    setCustomerData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>

            </Button> */}

      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="input-group mb-3">
              <input type="text" name="username" onChange={handleChange} className="form-control" placeholder="Enter User Name" id="username" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="Enter Customer Email" id="email" />
            </div>

            <div className="input-group mb-3">
              <input type="text" name="password" onChange={handleChange} className="form-control" placeholder="Enter Password" id="password" />
            </div>

            <div className="input-group mb-3">
              <input type="text" name="confirm_password" onChange={handleChange} className="form-control" placeholder="Confirm Password" id="confirm_password" />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}