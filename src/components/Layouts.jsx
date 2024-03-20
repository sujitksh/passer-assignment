import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Layouts() {
  return (
    <>
     <Sidebar />
     <div className="main-content">
      <Navbar />
      <Outlet />
     </div>
    </>
  )
}

export default Layouts