import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { API_URL } from '../../../api_config';

function ShowStaff() {
  const [oneStaff, setOneStaff] = useState([])

  const navigate = useNavigate()
  const id = window.location.pathname.split('/')[3]

  const handleCancle = () => {
    navigate('/staffs')
  }

  useEffect(() => {
    axios.get(`${API_URL}/attendance/getOneAttendancebyid/${id}`).then(res => setOneStaff(res.data)).catch(err => console.error(err))
  }, [])

  console.log(oneStaff)
  const evenNumber = []
  const oddNumber = []

  for (let i = 0; i <= oneStaff.length; i++) {
    if (i % 2 === 0) {
      evenNumber.push(i);
    } else {
      oddNumber.push(i);
    }
  }

  console.log(evenNumber)


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
            Staff Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Staff Details</h3>
          {
            <div>
              <table class="table">
                <thead className='table-head-white'>
                  <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    {/* <th scope="col">Total Hr</th> */}
                  </tr>
                </thead>
                <tbody>
                  {oneStaff?.map((staff, i) => {
                    return (
                      <tr key={staff.id}>
                        <th scope="row">{i + 1}</th>
                        {oneStaff.map((staff1) => {
                          return (
                            <td>{moment(staff1.dates).format('MMM D h:mm A')
                            }</td>
                          )
                        }).splice(evenNumber[i], 1)
                        }
                        {oneStaff.map((staff1) => {
                          return (
                            <td>{
                              moment(staff1.dates).format('MMM D h:mm A')
                            }</td>
                          )
                        }).splice(oddNumber[i], 1)
                        }
                        <td>{staff.quantity}</td>
                      </tr>
                    )
                  }).splice(0, oneStaff.length / 2)
                  }
                </tbody>
              </table>
            </div>
          }


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCancle}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShowStaff