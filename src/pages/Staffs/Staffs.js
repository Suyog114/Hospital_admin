import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchStaffData } from '../../redux/slices/StaffSlice'

import { useDispatch, useSelector } from 'react-redux'


function Staffs() {
  const dispatch = useDispatch()
  const staffData = useSelector(state => state.staff)

  const handleChng = (e) => {
    dispatch(fetchStaffData({ name: e.target.value }))

  }

  useEffect(() => {
    dispatch(fetchStaffData({ name: "" }))
  }, [])
  return (
    <>
      <Sidebar />
      <div className='all-cointainer'>
        <div className='dashboard-contain'>
          <h4>Staffs</h4>
          <div className='srchNButton mt-3'>
            <div className="group">
              <svg className="iconSrch" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Name" type="search" className="input" onChange={handleChng}></input>
            </div>
            <Link to='/staffs/add' style={{ textDecoration: 'none', color: 'initial' }}><button className='btn btn-primary text-white my-3 ms-auto d-flex align-items-center fw-normal me-4 py-2'><i className='bx bx-plus fw-bold fs-5 px-1'></i> ADD Staff</button></Link>
          </div>

          <div className='cointainer'>

            <table class="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Staff Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Position</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffData?.staff.map((data, i) => {
                  return (<tr key={data.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.username}</td>
                    <td>{data.role}</td>
                    <td>{data.staff.phone_number}</td>
                    <td>{data.staff.position}</td>
                    <td><Link style={{ textDecoration: 'none', color: 'initial' }} to={`/staffs/edit/${data.id}`}><i class='bx bxs-edit editBtn' ></i> </Link> <Link to={`/staffs/delete/${data.id}`} style={{ textDecoration: 'none', color: 'initial' }}><i class='bx bx-x deleteBtn' ></i></Link> <Link to={`/staffs/show/${data.id}`} style={{ textDecoration: 'none', color: 'initial' }}><i class='bx bx-show viewBtn'></i></Link></td>
                  </tr>)
                })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Staffs