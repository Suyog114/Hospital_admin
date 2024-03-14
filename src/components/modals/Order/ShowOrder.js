import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './orderModal.css'
import { API_URL } from '../../../api_config';

function ShowOrder() {
  const [oneOrder, setOneOrder] = useState([])

  const navigate = useNavigate()
  const id = window.location.pathname.split('/')[3]


  const handleCancle = () => {
    navigate('/orders')
  }

  useEffect(() => {
    axios.get(`${API_URL}/order/getOneOrder/${id}`).then(res => setOneOrder([res.data])).catch(err => console.error(err))
  }, [])

  console.log(oneOrder)
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
            Order Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Order Details</h3>
          {oneOrder?.map((order, i) => {
            return (
              <div key={order.id}>
                <div className='orderDetails'>
                  <div className='left-order'>
                    <div className='left'>
                      <strong>Order ID :</strong> <span>{order.id}</span>
                    </div>

                    <div className='left'>
                      <strong>Full Name :</strong> <span>{order.firstname} {order.lastname}</span>
                    </div>

                    <div className='left'>
                      <strong>Phone Number :</strong> <span>{order.phonenumber}</span>
                    </div>

                    <div className='left'>
                      <strong>Address 1 :</strong> <span>{order.address}</span>
                    </div>

                    <div className='left'>
                      <strong>State :</strong> <span>{order.state}</span>
                    </div>



                    <div className='left'>
                      <strong>Products :</strong> <span></span>
                    </div>

                  </div>
                  <div className='right-order'>
                    <div className='right'>
                      <strong>Order Date :</strong> <span>2023-03-26</span>
                    </div>

                    <div className='right'>
                      <strong>Order Payment :</strong> <span>{order.order_payment}</span>
                    </div>


                    <div className='right'>
                      <strong>Address 2 :</strong> <span>{order.address2}</span>
                    </div>
                                        
                    <div className='right'>
                      <strong>Zip :</strong> <span>{order.zip}</span>
                    </div>

                    <div className='right'>
                      <strong>Status :</strong> <span className='pending'>{order.status}</span>
                    </div>

                    {order.payment !== null && <div className='right'>
                      <strong>Khalti Token :</strong> <span>{order.payment?.token}</span>
                    </div>}

                    <div className='right'>
                      <strong>Total Amount :</strong> <span>NPR. <strong>{order.totalAmount}/-</strong></span>
                    </div>
                  </div>
                </div>

                <table class="table">
                  <thead className='table-head-white'>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Img</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products?.map((product, i) => {
                      return (
                        <tr key={product.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{product.product_name}</td>
                          <td><img src={`http://localhost:5000/images/${product.img}`} alt="product image"></img></td>
                          <td>{product.quantity}</td>
                          <td>{product.total_price}</td>
                        </tr>

                      )
                    })
                    }
                  </tbody>
                </table>

                
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

export default ShowOrder