import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import ReelFeed from "../../components/ReelFeed";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const handleBack = () => {
    navigate(-1); // 👈 same behavior as Profile.jsx
  };

  const removeSaved = async (item) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch {
      // noop
    }
  };

  return (
    <>
      {/* 🔙 Glass Back Button */}
      <button className="glass-back-btn" onClick={handleBack}>
        <span className="glass-icon">←</span>
        <span className="glass-text">Back</span>
      </button>

      <ReelFeed
        items={videos}
        onSave={removeSaved}
        emptyMessage="No saved videos yet."
      />
    </>
  );
};

export default Saved;
