import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { addStaffData } from '../.././redux/slices/StaffSlice'
import axios from "axios";
import { API_URL } from "../../api_config";


export default function AddStaffs() {
  const [staffData, setstaffData] = useState({
    name: ""
  })
  const [staffDataForState, setstaffDataForState] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => navigate('/staffs');

  const handleSave = async () => {
    // e.preventDefault()
    try {
      // if (staffData.name === "" || staffData.price === "" || staffData.img === "" || staffData.desc === "" || staffData.genre === "") {
      //   toast.error("Fields Cannot Be Empty !", {
      //     position: "top-right",
      //     theme: "colored"
      //   });
      // }
      const res = await axios.post(`${API_URL}/staff/registerStaff`, staffDataForState)
      dispatch(addStaffData({...staffData, id: res.data.id, role : 'staff'}))
      console.log(res.data)
      toast.success('Successfully Added', {
        position: "top-right",
        theme: "colored"
      })
      navigate("/staffs")
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-right",
        theme: "colored"
      })
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setstaffData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setstaffDataForState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeForStaff = (e) => {
    setstaffData(prev => ({ ...prev, ['staff']: { ...prev.staff, [e.target.name]: e.target.value } }))
    setstaffDataForState(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-body">
            <div className="input-group mb-3">
              <input type="text" name="full_name" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Staff Name" id="StaffName" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="username" onChange={handleChange} className="form-control" placeholder="Enter User Name" id="userName" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="Enter Email" id="email" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="password" onChange={handleChange} className="form-control" placeholder="Enter Password" id="password" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="confirm_password" onChange={handleChange} className="form-control" placeholder="Confirm Password" id="confirm_password" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="phone_number" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Phone Number" id="phoneNumber" />
            </div>
            <div className="input-group mb-3">
              <input type="number" name="age" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Staff Age" id="StaffAge" />
            </div>

            <div className="input-group mb-3">
              <input type="text" name="gender" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Gender" id="StaffGender" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="address" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Address" id="StaffAddress" />
            </div>

            <div className="input-group mb-3">
              <textarea type="text" name="desc" onChange={handleChangeForStaff} className="form-control" placeholder="Enter Staff Desciption" id="StaffDesc" />
            </div>



            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" name="position" onChange={handleChangeForStaff}>
                <option selected>Select Position</option>
                <option value="Gaurd">Gaurd</option>
                <option value="Nurse">Nurse</option>
                <option value="Manager">Manager</option>
                <option value="Pharmasist">Pharmasist</option>
                <option value="Cleaner">Cleaner</option>
              </select>
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