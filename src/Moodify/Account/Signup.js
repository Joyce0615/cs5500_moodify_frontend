import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  const checkAvailability = async (field, value) => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError((prev) => ({ ...prev, [field]: data.message }));
      } else {
        setError((prev) => ({ ...prev, [field]: "" }));
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const saveProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
  
      if (response.ok) {
        console.log("Profile saved successfully in MySQL");
        alert("Profile saved successfully!");
        navigate("/Moodify/MoodSelection");
      } else {
        console.error("Failed to save profile");
        alert("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile)); 
    }
  }, []);

  return (
    <div className="wd-profile-screen">
      <h2>Sign Up</h2>
      <div>
        <input
          className="wd-username form-control"
          placeholder="Username"
          value={profile.username}
          onChange={(e) => {
            setProfile({ ...profile, username: e.target.value });
            setError({ ...error, username: "" });
          }}
          onBlur={() => checkAvailability("username", profile.username)}
        />
        {error.username && <span className="error text-danger">{error.username}</span>}
        <br/>
        
        <input
          className="wd-password form-control"
          placeholder="Password"
          type="password"
          value={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        /><br/>
        
        <input
          className="wd-firstname form-control"
          placeholder="First Name"
          value={profile.firstName}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        /><br/>
        
        <input
          className="wd-lastname form-control"
          placeholder="Last Name"
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        /><br/>
        
        <input
          className="wd-email form-control"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => {
            setProfile({ ...profile, email: e.target.value });
            setError({ ...error, email: "" });
          }}
          onBlur={() => checkAvailability("email", profile.email)}
        />
        {error.email && <span className="error text-danger">{error.email}</span>}
        <br/>

        <button onClick={saveProfile} className="btn btn-success w-100 mb-2" disabled={error.username || error.email}>
          Sign Up
        </button>
        <button onClick={() => navigate("/login")} className="btn btn-danger w-100">
          Cancel
        </button>
      </div>
    </div>
  );
}
