import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="sidebar-links">
        <NavLink to="/mood-selection" activeClassName="active-link">Mood Selection</NavLink>
        <NavLink to="/music-news" activeClassName="active-link">Music News</NavLink>
        <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
