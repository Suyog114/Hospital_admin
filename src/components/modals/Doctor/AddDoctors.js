import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { addDoctorData } from '../../.././redux/slices/DoctorSlice'
import axios from "axios";
import { API_URL } from "../../../api_config";


export default function AddDoctors() {
  const [doctorData, setDoctorData] = useState("")
  const [doctorDataForState, setDoctorDataForState] = useState("")
  const [img, setImg] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => navigate('/doctors');

  const handleSave = async () => {
    // e.preventDefault()
    try {
      // if (doctorData.name === "" || doctorData.price === "" || doctorData.img === "" || doctorData.desc === "" || doctorData.genre === "") {
      //   toast.error("Fields Cannot Be Empty !", {
      //     position: "top-right",
      //     theme: "colored"
      //   });
      // }
      console.log(doctorDataForState)
      const res = await axios.post(`${API_URL}/doctor/registerDoctor`, doctorDataForState, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    
      dispatch(addDoctorData({...doctorData,['doctor']: { ...doctorData.doctor, img: img }, id: res.data.id}))
      console.log(res.data)
      toast.success('Successfully Added', {
        position: "top-right",
        theme: "colored"
      })
      navigate("/doctors")
    } catch (error) {
      toast.error('Failed to post doctor', {
        position: "top-right",
        theme: "colored"
      })
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setDoctorData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setDoctorDataForState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImgChange = (e) => {
    setDoctorData(prev => ({ ...prev, ['doctor']: { ...prev.doctor, [e.target.name]: e.target.files[0] } }))
    setDoctorDataForState(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))
    setImg(e.target.files[0].name)
  }

  const handleChangeForDoctor = (e) => {
    setDoctorData(prev => ({ ...prev, ['doctor']: { ...prev.doctor, [e.target.name]: e.target.value } }))
    setDoctorDataForState(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-body">
            <div className="input-group mb-3">
              <input type="text" name="fullname" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Doctor Name" id="doctorName" />
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
              <input type="text" name="phone_number" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Phone Number" id="phoneNumber" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="price" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Price" id="price" />
            </div>
            <div className="input-group mb-3">
              <input type="number" name="age" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Doctor Age" id="doctorAge" />
            </div>

            <div className="input-group mb-3">
              <input type="text" name="gender" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Gender" id="doctorGender" />
            </div>
            <div className="input-group mb-3">
              <input type="text" name="address" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Address" id="doctorAddress" />
            </div>

            <div className="input-group mb-3">
              <textarea type="text" name="desc" onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Doctor Desciption" id="doctorDesc" />
            </div>



            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" name="specialist" onChange={handleChangeForDoctor}>
                <option selected>Select Specialist</option>
                <option value="Eye">Eye</option>
                <option value="Nose">Nose</option>
                <option value="Toungue">Toungue</option>
                <option value="Neck">Neck</option>
                <option value="Bone">Bone</option>
              </select>
            </div>
            <div class=" d-flex align-items-center justify-content-between">
              <label for="formFile" class="form-label">Image: </label>
              <input name="img" onChange={handleImgChange} class="form-control m-3" type="file" id="formFile"></input>
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