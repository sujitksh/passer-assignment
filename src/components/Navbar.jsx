import React from 'react'
import "../css/styles.css"
import { useSelector } from 'react-redux'
function Navbar() {
    const {user} = useSelector((state)=>state.auth);
  return (
    <header>
            <div className="header-content">
                <label htmlFor="menu-toggle">
                    <span className="las la-bars"></span>
                </label>
                <div className="header-menu">
                    <div className="user">
                        <div className="bg-img">
                        <img className="bg-img" src="./image/pic1.png" />
                        <p className="user-img">{user?.username}</p>
                        </div>
                        {/* <span className="las la-power-off"></span>
                        <span>Logout</span> */}
                    </div>
                </div>
            </div>
        </header> 
  )
}

export default Navbar