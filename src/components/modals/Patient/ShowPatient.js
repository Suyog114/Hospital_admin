import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './patientModal.css'
import { API_URL } from '../../../api_config';

function ShowPatient() {
  const [onePatient, setOnePatient] = useState([])
  const [oneDoctor, setOneDoctor] = useState({})

  const navigate = useNavigate()
  const id = window.location.pathname.split('/')[3]


  const handleCancle = () => {
    navigate('/patients')
  }

  useEffect(() => {
    axios.get(`${API_URL}/patient/getOnePatient/${id}`).then(res => {
      setOnePatient([res.data])
      axios.get(`${API_URL}/patient//getOneDoctor/${res.data.doctorId}`).then(res => setOneDoctor(res.data)).catch(err => console.log(err))
    }).catch(err => console.error(err))
  }, [])

  console.log(oneDoctor)

  return (
    <>
      <Modal
        show={true}
        onHide={handleCancle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Patient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Patient Details</h3>
          {onePatient?.map((patient, i) => {
            return (
              <div key={patient.id}>
                <div className='orderDetails'>
                  <div className='left-order'>
                    <div className='left'>
                      <strong>Patient ID :</strong> <span>{patient.id}</span>
                    </div>

                    <div className='left'>
                      <strong>Full Name :</strong> <span>{patient.firstName} {patient.lastName}</span>
                    </div>

                    <div className='left'>
                      <strong>Phone Number :</strong> <span>{patient.phoneNumber}</span>
                    </div>

                    <div className='left'>
                      <strong>Address 1 :</strong> <span>{patient.address}</span>
                    </div>


                    <div className='left'>
                      <strong>Health Issue :</strong> <span className='pending'>{patient.healthIssue}</span>
                    </div>

                  </div>
                  <div className='right-order'>
                    <div className='right'>
                      <strong>Date of appointment :</strong> <span>{patient.dateOfAppointment}</span>
                    </div>

                    <div className='right'>
                      <strong>Date of birth :</strong> <span>{patient.dateOfBirth}</span>
                    </div>


                    <div className='right'>
                      <strong>Gender :</strong> <span>{patient.gender}</span>
                    </div>

                    <div className='right'>
                      <strong>Guadian Name :</strong> <span>{patient.guardian}</span>
                    </div>


                  </div>
                </div>

                <h3 className='mt-3 my-3'>Doctor Details</h3>


                <div className='orderDetails'>
                  <div className='left-order'>
                    <div className='left'>
                      <strong>Doctor ID :</strong> <span>{oneDoctor?.id}</span>
                    </div>

                    <div className='left'>
                      <strong>Full Name :</strong> <span>{oneDoctor?.fullname}</span>
                    </div>

                    <div className='left'>
                      <strong>Gender :</strong> <span>{oneDoctor?.gender}</span>
                    </div>

                    <div className='left'>
                      <strong>Specialist :</strong> <span>{oneDoctor?.specialist}</span>
                    </div>


                    <div className='left'>
                      <strong>Phone Number :</strong> <span>{oneDoctor?.phone_number}</span>
                    </div>

                  </div>
                  <div className='right-order doctorRight'>
                  <img src={`http://localhost:5000/images/${oneDoctor?.img}`} alt="Doctor image"></img>
                  </div>
                </div>


              </div>





            )
          })
          }


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCancle}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShowPatient