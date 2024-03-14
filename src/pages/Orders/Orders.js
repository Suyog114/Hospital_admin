import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchData } from '../../redux/slices/OrderSlice'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './Orders.css'


function Orders() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.order)
  const handleChng = (e) => {
    dispatch(fetchData({ name: e.target.value }))
  }

  useEffect(() => {
    dispatch(fetchData({ name: "" }))
  }, [])

  return (
    <>
      <Sidebar />
      <div className='all-cointainer'>
        <div className='dashboard-contain'>
          <h4>Orders</h4>
          <div className='srchNButton mt-3'>
            <div className="group">
              <svg className="iconSrch" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Name" type="search" className="input" onChange={handleChng}></input>
            </div>
          </div>
          <div className='cointainer'>
            <table class="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Payment Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.data.map((order, i) => {
                  return (<tr>
                    <th scope="row">{i + 1}</th>
                    <td>{order.firstname}</td>
                    <td>{order.address}</td>
                    <td>{order.order_payment}</td>
                    <td className='orderStatus'>{order.status || "NO"}</td>
                    <td><Link style={{ textDecoration: 'none', color: 'initial' }} to={`/orders/edit/${order.id}`}><i class='bx bxs-edit editBtn' ></i> </Link> <Link to={`/orders/show/${order.id}`} style={{ textDecoration: 'none', color: 'initial' }}><i class='bx bx-show viewBtn'></i></Link></td>

                  </tr>)
                })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default Orders