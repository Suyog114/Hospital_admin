import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarList } from "./SidebarList";
import "./Sidebar.css";
import { Button } from 'react-bootstrap';
import userImg from '../../../src/img/user.png'

function Sidebar() {
  const [clicked, setClicked] = useState(false);
  const barList = SidebarList.map(({ url, title, icon }, index) => {
    return (
      <div key={index} className='sidebar-item'>
        <NavLink style={{ textDecoration: 'none' }} exact to={url} activeClassName="active">
          <span className="icon"><i class={`bx ${icon}`}></i></span>{title}
        </NavLink>
      </div>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };


  return (
    <nav>
      <div className="logo">
        <span className="firstLogo">MED</span><span>Care</span>
      </div>
      <hr className="hr" />
      <div className="menu-icon" onClick={handleClick}>
      </div>
      <div className={clicked ? "menu-list" : "menu-list close"}>
        {barList}
      </div>
      <hr className="hr" />
      <div className="userInfo">
        <div className="user">
          <img src={userImg}></img>
        </div>
        <div className="username">Suyog</div>
        <div><i class='bx bxs-down-arrow'></i></div>
      </div>
    </nav>
  )
}

export default Sidebar;