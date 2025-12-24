import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setVideos(response.data.foodItems);
      })
      .catch(() => {
        /* noop: optionally handle error */
      });
  }, []);

  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.like) {
      console.log("Video liked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
        )
      );
    } else {
      console.log("Video unliked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
        )
      );
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v
        )
      );
    }
  }

  // Simple logout function
  async function handleLogout() {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", {
        withCredentials: true,
      });
      // Redirect to login page
      window.location.href = "/user/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, redirect to login
      window.location.href = "/user/login";
    }
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Logout Button - Top Left */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "24px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span>Logout</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>

      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />
    </div>
  );
};

export default Home;
