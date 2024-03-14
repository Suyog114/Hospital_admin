import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { editData } from '../../../redux/slices/OrderSlice'
import axios from "axios";
import { API_URL } from "../../../api_config";


export default function EditOrder() {
  const [orderData, setOrderData] = useState([])
  const [status, setStatus] = useState('Pending')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id = window.location.pathname.split('/')[3]

  const handleClose = () => navigate('/orders');

  const handleSave = async () => {
    try {
      const res = await axios.patch(`${API_URL}/order/updateOrder/${id}`, {status: status})
      dispatch(editData({id:id, status: status}))
      toast.success('Successfully Updated', {
        position: "top-right",
        theme: "colored"
      })
      navigate("/orders")
    } catch (error) {
      toast.error('Failed to post product', {
        position: "top-right",
        theme: "colored"
      })
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    axios.get(`${API_URL}/order/getOneOrder/${id}`).then(res => {
      setOrderData(res.data)
      setStatus(res.data.status)
    }).catch(err => {
      toast.error(err, {
        position: "top-right",
        theme: "colored"
      });
    })

  }, [])

  console.log(orderData)

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
          <Modal.Title>Edit Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-body">
            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" value={status} name="position" onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Canceled">Canceled</option>
              </select>
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