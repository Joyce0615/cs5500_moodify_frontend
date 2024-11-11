import { Link, useLocation } from 'react-router-dom';
import { SmileOutlined, SearchOutlined, AppstoreOutlined, HomeOutlined} from '@ant-design/icons';
import './NavigationBar.css';

export default function NavigationBar() {
  const { pathname } = useLocation();

  //check if user login
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const links = [];

  //if login is false, show login page only
  if (!isLoggedIn) {
    links.push({ label: "Login", path: "/Moodify/Login", icon: HomeOutlined });
  } else {
    links.push(
      { label: "Mood Selection", path: "/Moodify/MoodSelection", icon: SmileOutlined },
      { label: "Music News", path: "/Moodify/MusicNews", icon: SearchOutlined },
      { label: "Profile", path: "/Moodify/Profile", icon: AppstoreOutlined }
    );
  }
  
  return (
    <div id="moodify-navigation" className="sidebar">
      <div className="list-group">
        <a target="_blank" className="logo-container">
          <img src="/images/moodify.png" className="logo-img" alt="Moodify Logo" />
        </a>
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`list-group-item ${
                pathname.includes(link.path) ? "active-link" : ""
              }`}
            >
              <IconComponent className="icon" />
              <span className="label">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
