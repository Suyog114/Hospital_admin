import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editData } from '../../../redux/slices/CustomerSlice'
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from "../../../api_config";



export default function EditCustomer() {
  const [customerData, setCustomerData] = useState({
    username: "",
    email: ""
  })
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClose = () => navigate('/customers');

  const id = window.location.pathname.split('/')[3]

  const handleSave = async () => {
    // e.preventDefault()
    try {
      if (customerData.name === "" || customerData.email === "") {
        toast.error("Fields cannot be empty !!", {
          position: "top-right",
          theme: "colored"
        });
      }
      else {
        await axios.put(`${API_URL}/user/updateUser/${id}`, customerData)
        dispatch(editData({ id: id, newData: { ...customerData, role: 'user', id: Number(id) } }))
        navigate("/customers")
        toast.success('Successfully Updated', {
          position: "top-right",
          theme: "colored"
        })
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message, {
        position: "top-right",
        theme: "colored"
      })
    }
  }


  const handleChange = (e) => {
    setCustomerData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    axios.get(`${API_URL}/user/findOneUser/${id}`).then(res => setCustomerData({
      username: res.data.username,
      email: res.data.email
    })).catch(err => {
      toast.error(err, {
        position: "top-right",
        theme: "colored"
      });
    })

  }, [])



  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div class="inputGroup">
              <input type="text" name="username" value={customerData.username} onChange={handleChange} id="username"></input>
                <label for="username">Username</label>
            </div>  
            <div class="inputGroup">
              <input type="text" name="email" value={customerData.email} onChange={handleChange} id="email"></input>
                <label for="email">Email</label>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}