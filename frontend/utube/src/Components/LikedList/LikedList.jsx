import React, { useState, useEffect } from "react";
import { BACKEND_URI } from "../Config/constants";
import LikedCard from "./LikedCard";
import NavBar from "../NavBar/NavBar";
import Homepage from "../Homepage/homepage";
import './LikedList.scss'

const LikedList = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  console.log(medias);
  //  let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";
  const handletoken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  };
  const token = handletoken();

  const getAllMedias = () => {
    fetch(`${BACKEND_URI}/feelings/videos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMedias(data.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error Happened! in UPLOAD FORM");
      });
  };

  console.log(medias);

  // const videolib =  medias.length > 0 ? medias.map(media=>(

  //     <LikedCard key={media._id} medias={media} />
  // )):null;

  const videolib = medias ? (
    medias.length > 0 ? (
      <div className="subscription-card-container">
        {medias.map((media) => (
          <LikedCard key={media._id} medias={media} />
        ))}
      </div>
    ) : (
      <div className="no-subscribed-videos">No Liked videos</div>
    )
  ) : (
    <div className="no-subscribed-videos">No Liked videos</div>
  );

  return (
    <>
      <NavBar />
      <Homepage />
      <h2>Liked Videos</h2>
      <div className="video-container">{videolib}</div>
    </>
  );
};

export default LikedList;
