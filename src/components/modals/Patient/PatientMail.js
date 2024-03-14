import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../../api_config';


function PatientMail() {
  const [onePatient, setOnePatient] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const id = window.location.pathname.split('/')[3]



  const handleClose = () => navigate('/patients');

  const handleEmailChange = (e) => {
    setOnePatient(prev => ({ ...prev, email: e.target.value }))
  }

  const handleChange =(e)=>{
    setOnePatient(prev => ({ ...prev, [e.target.name]: e.target.value }))

  }

  const handleSave = async() => {
    try {
      setLoading(true)
      await axios.post(`${API_URL}/doctor/sendMail`, onePatient)
      navigate('/patients')
      toast.success('Successfully Sent Mail', {
        position: "top-right",
        theme: "colored"
      })
      setLoading(false)
    } catch (error) {
      toast.error('Failed to send mail', {
        position: "top-right",
        theme: "colored"
      })
      setLoading(false)
      console.log(error)

    }
  }

  useEffect(() => {
    axios.get(`${API_URL}/patient/getOnePatient/${id}`).then(res => {
      setOnePatient({ email: res.data.email })
    }).catch(err => console.error(err))
  }, [])

  console.log(onePatient)
  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={onePatient?.email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                autoFocus
                onChange={handleChange}
                name= "subject"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mail Box</Form.Label>
              <Form.Control as="textarea" name= "text" onChange={handleChange} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={handleSave}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  )
}

export default PatientMail