import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/store_logo.png";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  // 🔙 Back button handler
  const handleBack = () => {
    navigate(-1);
  };

  // 🔐 Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("/login");
    }
  };

  return (
    <main className="profile-page">
      

      {/* 🔙 Back Button */}
      <button className="glass-back-btn" onClick={handleBack}>
        <span className="glass-icon">←</span>
        <span className="glass-text">Back</span>
      </button>

      <section className="profile-header">
        <div className="profile-meta">
          <img className="profile-avatar" src={logo} alt="Store logo" />

          <div className="profile-info">
            <h1 className="profile-pill profile-business">{profile?.name}</h1>
            <p className="profile-pill profile-address">{profile?.address}</p>
          </div>
        </div>

        <div className="profile-stats" role="list">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">total meals</span>
            <span className="profile-stat-value">{profile?.totalMeals}</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">customer served</span>
            <span className="profile-stat-value">
              {profile?.customersServed}
            </span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid">
        {videos.map((v) => (
          <div key={v.id} className="profile-grid-item">
            <video
              className="profile-grid-video"
              src={v.video}
              muted
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
