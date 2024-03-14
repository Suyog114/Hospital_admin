import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import StatusCard from '../../components/StatusCard/StatusCard'
import './Dashboard.css'
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchData } from '../../redux/slices/OrderSlice'
// import { fetchData } from '../.././redux/slices/CustomerSlice'
import axios from 'axios'
import moment from 'moment'
import { API_URL } from '../../api_config';


const data = {
  options: {
    color: ['#6ab04c'],
    chart: {
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['mar', 'apr']
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    }
  },
  series: [
    {
      name: "Products Sales",
      data: [300, 250]
    }
  ]
}

function Dashboard() {
  const orders = useSelector(state => state?.order)
  const customer = useSelector(state => state.customer)
  const [totalCustomer, setTotalCustomer] = useState("")
  const [totalDoctor, setTotalDoctor] = useState("")
  const [totalPatients, setTotalPatients] = useState("")

  const dispatch = useDispatch()
  const ordersDates = []
  const totalAmt = []

  orders?.data?.map((order, i) => {

    ordersDates.unshift(moment(order.createdAt).format('MMM-D'))
    totalAmt.unshift(order.totalAmount)
  })

  const options = {
    color: ['#6ab04c'],
    chart: {
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ordersDates
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    }
  }
  const series = [
    {
      name: "Products Sales",
      data: totalAmt
    }
  ]

  useEffect(() => {
    dispatch(fetchData({ name: "" }))
    axios.get(`${API_URL}/user/getUserLength`).then(res => setTotalCustomer(res.data.length)).catch(e => console.log(e))
    axios.get(`${API_URL}/doctor/getAllDoctor?name=`).then(res => setTotalDoctor(res.data.length)).catch(e => console.log(e))
    axios.get(`${API_URL}/patient/getPatients?name=`).then(res => setTotalPatients(res.data.length)).catch(e => console.log(e))
  }, [])
  return (
    <>
      <Sidebar />
      <div className='all-cointainer'>
        <div className='dashboard-contain'>
          <h4>Dashboard</h4>
          <div className='cointainer'>

            <div className='dashboard-left'>
              <div className='left-cards'>
                <div className='lCards'>
                  <StatusCard number={orders?.data.length} name={'Total Sales'} />
                </div>
                <div className='lCards'>
                  <StatusCard number={totalCustomer} name={'Customer'} />
                </div>
              </div>

              <div className='left-cards'>
                <div className='lCards'>
                  <StatusCard number={totalDoctor} name={'Doctors'} />
                </div>
                <div className='lCards'>
                  <StatusCard number={3} name={'Patients'} />
                </div>
              </div>
            </div>


            <div className='dashboard-right'>
              <div className='RCards cardsHeigth'>

                {/* chart */}
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  height="100%"
                />
              </div>
            </div>

          </div>

        </div>

        <div className='latestOrders'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Order Id</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data.map((order, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{order.id}</td>
                    <td>{`${order.firstname} ${order.lastname}`}</td>
                    <td>NPR {order.totalAmount}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard