import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  // const recommendations = [
  //   { title: 'Every Night (Night Visions)', artist: 'Imagine Dragons' },
  //   { title: 'Atlantic (Under the Iron Sea)', artist: 'Keane' },
  //   { title: 'One More Night (Overexposed)', artist: 'Maroon 5' },
  //   { title: 'Honey Bee (Red River Blue)', artist: 'Blake Shelton' },
  // ];
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

    const username = localStorage.getItem("user");

    if (username) {
        fetch(`http://127.0.0.1:5001/api/profile?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Error retrieving profile:", data.error);
                } else {
                    displayUserProfile(data); // Function to update UI with profile data
                }
            })
            .catch(error => console.error("Error fetching profile:", error));
    } else {
        console.error("No username found in local storage.");
    }

    //handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('user',"");
    navigate('/Moodify/Login');
  };

  //upload image
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await fetch('http://127.0.0.1:5001/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {

                const newdata = {
                    img: data.fileUrl.toString(),
                    username: localStorage.getItem("user")
                };
                console.log(newdata);


                const res=await fetch('http://127.0.0.1:5001/api/img', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'  // Specify JSON content type
                    },
                    body: JSON.stringify(newdata)
                });
                if(res.ok){
                    console.log("upload to mysql successfully");

                }
                console.log("Image uploaded successfully",data.fileUrl);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    function displayUserProfile(profile) {
        document.getElementById("name").innerText = profile.username;
        document.getElementById("email").innerText = profile.email;
        document.getElementById("profileImage").src = profile.img;
    }

// HTML Structure
    /*
    <div>
        <h1 id="name"></h1>
        <p id="email"></p>
        <img id="profileImage" alt="Profile Image" />
    </div>
    */


    return (
    <div className="profile-container">

      <div className="profile-header">

          <div>
              <h1 id="name"></h1>
              <p id="email"></p>
              <img id="profileImage" alt="Profile Image" />
          </div>

      </div>
        {/*upload image */}
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>

      <div className="tabs">
        <span className="active-tab">Favourite Songs</span>
        <span>Profile</span>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Profile;