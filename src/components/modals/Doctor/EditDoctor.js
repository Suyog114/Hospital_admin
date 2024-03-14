import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { editDoctorData } from '../../.././redux/slices/DoctorSlice'
import axios from "axios";
import { API_URL } from "../../../api_config";


export default function EditDoctors() {
  const [doctorData, setDoctorData] = useState({
    fullname: "",
    phone_number: "",
    price: "",
    age: "",
    gender: "",
    address: "",
    desc: "",
    specialist: "",
    username: "",
    email: "",
  })
  const [doctorDataForState, setDoctorDataForState] = useState({})
  const [img, setImg] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => navigate('/doctors');
  const id = window.location.pathname.split('/')[3]


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
      const res = await axios.patch(`${API_URL}/doctor/updateDoctor/${id}`, doctorDataForState, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      dispatch(editDoctorData({ newData: { ...doctorData, ['doctor']: {...doctorData.doctor, img: img}}, id }))
      console.log(res.data)
      toast.success('Successfully Updated', {
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

  useEffect(() => {
    axios.get(`${API_URL}/doctor/getOneDoctor/${id}`).then((res) => {
      setDoctorData(res.data[0])
      setImg(res.data[0].doctor.img)
      setDoctorDataForState({
        fullname: res.data[0].doctor?.fullname,
        phone_number: res.data[0].doctor?.phone_number,
        price: res.data[0].doctor?.price,
        age: res.data[0].doctor?.age,
        gender: res.data[0].doctor?.gender,
        address: res.data[0].doctor?.address,
        desc: res.data[0].doctor?.desc,
        specialist: res.data[0].doctor?.specialist,
        username: res.data[0].username,
        email: res.data[0].email
      })
    }).catch((error) => { console.log(error) })
  }, [])
  console.log(doctorData)
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
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="modal-body">

          <div class="inputGroup">
              <input type="text" name="fullname" value={doctorData?.doctor?.fullname} onChange={handleChangeForDoctor} id="doctorName" ></input>
                <label for="doctorName">Name</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="username" value={doctorData?.username} onChange={handleChange} id="userName" ></input>
                <label for="userName">Username</label>
            </div>

            
            <div class="inputGroup">
              <input type="text" name="email" value={doctorData?.email} onChange={handleChange} id="email" ></input>
                <label for="email">Email</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="phone_number" value={doctorData?.doctor?.phone_number} onChange={handleChangeForDoctor} id="phoneNumber" ></input>
                <label for="phoneNumber">Phone Number</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="price" value={doctorData?.doctor?.price} onChange={handleChangeForDoctor} id="price"  ></input>
                <label for="price">Price</label>
            </div>

            <div class="inputGroup">
              <input type="number" name="age" value={doctorData?.doctor?.age} onChange={handleChangeForDoctor} id="doctorAge"  ></input>
                <label for="doctorAge">Age</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="gender" value={doctorData?.doctor?.gender} onChange={handleChangeForDoctor} id="doctorGender" ></input>
                <label for="doctorGender">Gender</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="address" value={doctorData?.doctor?.address} onChange={handleChangeForDoctor} id="doctorAddress"  ></input>
                <label for="doctorAddress">Address</label>
            </div>

            <div className="input-group mb-3">
              <textarea type="text" name="desc" value={doctorData?.doctor?.desc} onChange={handleChangeForDoctor} className="form-control" placeholder="Enter Doctor Desciption" id="doctorDesc" />
            </div>



            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" name="specialist" value={doctorData?.doctor?.specialist} onChange={handleChangeForDoctor}>
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
          <Button variant="secondary" onClick={handleSave}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}