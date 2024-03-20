import React from 'react'
import { Link } from 'react-router-dom'
import "../css/styles.css"

function Sidebar() {
  return (
    <>
      <input type="checkbox" id="menu-toggle" />
      <div className="sidebar">
        <div className="side-header">
            <h3>Admin Panell</h3>
        </div>
        
        <div className="side-content">
         
            <div className="side-menu">
                <ul>
                    <li>
                       <Link to="/listUser" className="active">
                            <span className="las la-home"></span>
                            <small>Dashboard</small>
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    </div>
    </>
  )
}

export default Sidebar