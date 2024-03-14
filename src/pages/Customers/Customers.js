import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchData, addData, editData, deleteData } from '../.././redux/slices/CustomerSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


function Customers() {
  const dispatch = useDispatch()
  const customer = useSelector(state => state.customer)
  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <>
      <Sidebar />
      <div className='all-cointainer'>
        <div className='dashboard-contain'>
          <h4>Customer</h4>
          {/* search  */}
          <div className='srchNButton mt-3'>
          <div className="group">
            <svg className="iconSrch" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Customer Name..." type="search" className="input"></input>
          </div>
          <Link to='/customers/add' style={{ textDecoration: 'none', color: 'initial' }}><button className='btn btn-primary text-white my-3 ms-auto d-flex align-items-center fw-normal me-4 py-2'><i className='bx bx-plus fw-bold fs-5 px-1'></i> ADD Customer</button></Link>
          </div>

          <div className='cointainer'>

            <table className="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customer?.data.map((data, i) => (
                  <tr key={data.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td><Link style={{ textDecoration: 'none', color: 'initial' }} to={`/customers/edit/${data.id}`}><i className='bx bxs-edit editBtn' ></i> </Link> <Link to={`/customers/delete/${data.id}`} style={{ textDecoration: 'none', color: 'initial' }}><i className='bx bx-x deleteBtn' ></i></Link></td>
                  </tr>
                ))
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center" />
      <Outlet />
    </>
  )
}

export default Customers