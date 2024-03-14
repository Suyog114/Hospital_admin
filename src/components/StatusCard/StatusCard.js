import React from 'react'
import './StatusCard.css'

function StatusCard({number, name}) {
  return (
    <div className='status-card'>
      <div className='status-card-icon'>
        <i class='bx bx-shopping-bag'></i>
      </div>
      <div className='status-card-info'>
        <h4>{number}</h4>
        <span><i>{name}</i></span>
      </div>

    </div>
  )
}

export default StatusCard