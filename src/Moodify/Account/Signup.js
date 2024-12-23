import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import './Signup.css';

export default function Signup() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const checkAvailability = async (field, value) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/check`, {
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

  const handleSignUp = async () => {
    const newError = {};
    if (!profile.username) newError.username = "Username is required";
    if (!profile.password) newError.password = "Password is required";
    if (!profile.firstName) newError.firstName = "First name is required";
    if (!profile.lastName) newError.lastName = "Last name is required";
    if (!profile.email) newError.email = "Email is required";

    if (error.username) newError.username = error.username;
    if (error.email) newError.email = error.email;
  
    setError(newError);
  
    if (Object.keys(newError).length > 0) {
      console.error("Form validation failed:", newError);
      return;
    }
    
    // Send the verification code to the email
    try {
      const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: profile.email }),
      });

      if (response.ok) {
        setIsCodeSent(true);  // Update state to reflect that code has been sent
        console.log("Verification code sent to email");
      } else {
        console.error("Failed to send verification code");
        alert("Failed to send verification code");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };
  
  const verifyCode = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: profile.email, code: verificationCode }),
      });

      if (response.ok) {
        console.log("Email verified successfully");
        alert("Email verified successfully!");

        // Proceed with final registration
        const finalResponse = await fetch(`${process.env.REACT_APP_REMOTE_SERVER}/api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (finalResponse.ok) {
          console.log("Profile saved successfully in MySQL");
          alert("Profile saved successfully!");

          localStorage.setItem("user", profile.username);
          localStorage.setItem("isLoggedIn", "true"); // user login
  
          navigate("/Moodify/MoodSelection");
        } else {
          console.error("Failed to save profile");
          alert("Failed to save profile");
        }
      } else {
        console.error("Invalid verification code");
        alert("Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

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
          onChange={(e) => {
            setProfile({ ...profile, password: e.target.value });
            setError({ ...error, password: "" });
          }}/>
          {error.password && <span className="error text-danger">{error.password}</span>}
          <br/>
        <input
          className="wd-firstname form-control"
          placeholder="First Name"
          value={profile.firstName}
          onChange={(e) => {
            setProfile({ ...profile, firstName: e.target.value });
            setError({ ...error, firstName: "" });
          }}
        />
        {error.firstName && <span className="error text-danger">{error.firstName}</span>}
        <br/>
        
        <input
          className="wd-lastname form-control"
          placeholder="Last Name"
          value={profile.lastName}
          onChange={(e) => {
            setProfile({ ...profile, lastName: e.target.value });
            setError({ ...error, lastName: "" });
          }}
        />
        {error.lastName && <span className="error text-danger">{error.lastName}</span>}
        <br/>
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
        {isCodeSent && (
          <div>
            <input
              className="wd-verification-code form-control"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={verifyCode} className="btn btn-primary w-100 mb-2">
              Verify Code
            </button>
          </div>
        )}
        <button onClick={handleSignUp} className="btn btn-success w-100 mb-2">
          Sign Up
        </button>
        <button onClick={() => navigate("/Moodify/Login")} className="btn btn-danger w-100">
          Cancel
        </button>
      </div>
    </div>
  );
}
