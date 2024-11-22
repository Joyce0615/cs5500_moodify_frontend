import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SmileOutlined, SearchOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import './NavigationBar.css';

export default function NavigationBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const links = [];

  // If user is not logged in, show the login page only
  if (!isLoggedIn) {
    links.push({ label: "Login", path: "/Moodify/Login", icon: HomeOutlined });
  } else {
    links.push(
      { label: "Mood Selection", path: "/Moodify/MoodSelection", icon: SmileOutlined },
      { label: "Music News", path: "/Moodify/MusicNews", icon: SearchOutlined },
      { label: "Profile", path: "/Moodify/Profile", icon: AppstoreOutlined }
    );
  }

  const handleMoodSelectionClick = () => {
    // Check the last visited sub-page for Mood Selection
    const lastMoodSubPage = localStorage.getItem('lastMoodSubPage') || 'MoodSelection';
    navigate(`/Moodify/${lastMoodSubPage}`); // Navigate to the last sub-page or default to MoodSelection
  };

  return (
    <div id="moodify-navigation" className="sidebar">
      <div className="list-group">
        <a target="_blank" className="logo-container">
          <img src="/images/moodify.png" className="logo-img" alt="Moodify Logo" />
        </a>
        {links.map((link) => {
          const IconComponent = link.icon;

          // Special case for Mood Selection to handle dynamic navigation
          if (link.label === "Mood Selection") {
            return (
              <div
                key={link.path}
                onClick={handleMoodSelectionClick}
                className={`list-group-item ${
                  pathname.includes(link.path) ? "active-link" : ""
                }`}
              >
                <IconComponent className="icon" />
                <span className="label">{link.label}</span>
              </div>
            );
          }

          // Default navigation for other links
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
