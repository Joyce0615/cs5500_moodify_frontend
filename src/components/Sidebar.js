// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import '../styles/Sidebar.css';

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <button className="toggle-button" onClick={toggleSidebar}>
//         ☰
//       </button>
//       <div className="sidebar-links">
//         <NavLink to="/mood-selection" activeClassName="active-link">Mood Selection</NavLink>
//         <NavLink to="/music-news" activeClassName="active-link">Music News</NavLink>
//         <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, LoginOutlined, SmileOutlined, SearchOutlined } from '@ant-design/icons';
import '../styles/Sidebar.css';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Navigation', 'sub2', <AppstoreOutlined />, [
    getItem('Mood Selection', 'mood-selection', <SmileOutlined />),
    getItem('Music News', 'music-news', <SearchOutlined />),
    getItem('Profile', 'profile', <AppstoreOutlined />),
    getItem('Logout', 'logout', <LoginOutlined />),
  ]),
];

const Sidebar = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    if (e.key === 'logout') {
      // Implement your logout logic here
      console.log('User logged out');
    } else {
      navigate(`/${e.key}`);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        height: '100vh',
      }}
      defaultOpenKeys={['sub2']}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
