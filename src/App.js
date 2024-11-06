// import React, { useState, createContext } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import AgeSelection from './components/AgeSelection';
// import SexSelection from './components/SexSelection';
// import MoodSelection from './components/MoodSelection';
// import Songs from './components/Songs';
// import Profile from './components/Profile';
// import ProfileButton from './components/ProfileButton';
// import Sidebar from './components/Sidebar'; // Import Sidebar component
// import MusicNews from './components/MusicNews';

// import './styles/App.css';

// // Create a context for managing selections
// export const UserSelectionContext = createContext();

// function App() {
//   const [userSelections, setUserSelections] = useState({
//     genre: [],
//     age: null,
//     sex: null,
//     mood: null,
//   });

//   const updateSelection = (key, value) => {
//     setUserSelections((prevSelections) => ({
//       ...prevSelections,
//       [key]: value,
//     }));
//   };

//   return (
//     <UserSelectionContext.Provider value={{ userSelections, updateSelection }}>
//       <Router>
//         <div className="App">
//           <Sidebar /> {/* Render Sidebar on every page */}
//           <ProfileButton />
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/age-selection" element={<AgeSelection />} />
//             <Route path="/sex-selection" element={<SexSelection />} />
//             <Route path="/mood-selection" element={<MoodSelection />} />
//             <Route path="/songs" element={<Songs />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/music-news" element={<MusicNews />} />
//           </Routes>
//         </div>
//       </Router>
//     </UserSelectionContext.Provider>
//   );
// }

// export default App;


import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AgeSelection from './components/AgeSelection';
import SexSelection from './components/SexSelection';
import MoodSelection from './components/MoodSelection';
import Songs from './components/Songs';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import MusicNews from './components/MusicNews';

import './styles/App.css';

// Create a context for managing selections
export const UserSelectionContext = createContext();

function App() {
  const [userSelections, setUserSelections] = useState({
    genre: [],
    age: null,
    sex: null,
    mood: null,
  });

  const updateSelection = (key, value) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  return (
    <UserSelectionContext.Provider value={{ userSelections, updateSelection }}>
      <Router>
        <div className="App" style={{ display: 'flex' }}>
          <Sidebar /> {/* Render the Ant Design Sidebar */}
          <div style={{ marginLeft: '260px', padding: '20px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home-page" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/age-selection" element={<AgeSelection />} />
              <Route path="/sex-selection" element={<SexSelection />} />
              <Route path="/mood-selection" element={<MoodSelection />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/music-news" element={<MusicNews />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserSelectionContext.Provider>
  );
}

export default App;
