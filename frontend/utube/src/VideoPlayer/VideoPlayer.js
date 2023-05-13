import React, { useState, useEffect } from "react";
import { DefaultPlayer as Video } from "react-html5video/dist";
import "react-html5video/dist/styles.css";
import thumb from "../img/thumb.jpg";
import styles from "./styles-module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
// import NavBar from './../NavBar/Navbar'
import NavBar from "../Components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [isThumbsUpHovered, setIsThumbsUpHovered] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [commentData, setCommentData] = useState(" ");

  const { id } = useParams();
  const videoRef = useRef(null);

  const handletoken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  };
  const token = handletoken();

  useEffect(() => {
    fetch("http://localhost:9002/videos/" + id)
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        console.log("inside videos 1");
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  const url = `http://localhost:9002/public/videos/${videoData.data.url}`;
  //console.log("video url " + videoData.data.url);
  const user = videoData.userId;

//   const video = document.getElementById('myVideo');
// const pauseSymbol = document.getElementById('pauseSymbol');

// video.addEventListener('pause', () => {
//   pauseSymbol.style.display = 'block';
// });

// video.addEventListener('play', () => {
//   pauseSymbol.style.display = 'none';
// });

  const handleThumbsUpHover = () => {
    setIsThumbsUpHovered(true);
  };

  const handleThumbsUpLeave = () => {
    setIsThumbsUpHovered(false);
  };

  const handleClick = () => {
    console.log("inside handleClick");
    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";

    // fetch video id
    fetch("http://localhost:9002/feelings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: videoData.data._id,
        type: "like",
      }),
    }).then((response) => {
      console.log("inside fetch");
      console.log("res " + response);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      return response.json();
    });
    // .then(data => {
    //   console.log('Feeling saved:', data);
    // })
    // .catch(error => {
    //   console.error('Error saving feeling:', error);
    // });
    window.location.reload(true);
  };

  const handleSubscriberClick = () => {
    console.log("inside handleSubscriberClick");
    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";

    fetch("http://localhost:9002/subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelId: videoData.data.userId._id,
      }),
    }).then((response) => {
      console.log("inside fetch of subscriber click");
      console.log("res " + response);
      return response.json();
    });

    setSubscribed((current) => !current);
  };

  const handleComment = () => {
    console.log("posted comment " + commentData);
    console.log("inside comments handle function");

    fetch("http://localhost:9002/comments", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentText: commentData,
        videoId: videoData.data._id,
        userId: videoData.data.userId._id,
      }),
    }).then((response) => {
      console.log("inside fetch of comment click");
      console.log("res " + response);
      return response.json();
    });
    setCommentData(" ");
  };

  const handleLoadedMetadata = () => {
    videoRef.current.play();
  };

  return (
    <div>
      <NavBar />
    <div className="vdo-container">
      <video id = "myVideo" ref={videoRef} onLoadedMetadata={handleLoadedMetadata} controls>
        <source src={url} type="video/mp4" />
      </video>
      <div className="name-subs">
        <p className="vdo-title">{videoData.data.title}</p>
        <p className="channel-name">
          {videoData.data.userId.firstName} {videoData.data.userId.lastName}!
        </p>
        <button className="btn" onClick={handleSubscriberClick}>
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="thumb-container">
        <p className="liked">{videoData.data.likes}</p>
        <button className="up-btn" onClick={handleClick}>
          <FaRegThumbsUp
            className="up thumb"
            onMouseEnter={handleThumbsUpHover}
            onMouseLeave={handleThumbsUpLeave}
          />
        </button>
        <p className="disliked">{videoData.data.dislikes}</p>
        <button className="down-btn" onClick={handleClick}>
          <FaRegThumbsDown className="down thumb" />
        </button>
      </div>

      <div className="veu-div">
        <p className="veus">{videoData.data.views} Views</p>
        <p>{videoData.data.description}</p>
        <input
          type="text"
          placeholder="Enter your comments"
          className="comments"
          onChange={(evt) => setCommentData(evt.target.value)}
        />
        <button className="btn-comment" onClick={handleComment}>
          Comment
        </button>
      </div>
      {videoData.data.comments.length > 0 && (
  <div className="comments-div">
    <p>
      {videoData.data.comments[0].commentText}{" "}
      {videoData.data.comments[0].userId}
    </p>
    {videoData.data.comments.length > 1 && (
      <p>{videoData.data.comments[1].commentText}</p>
    )}
  </div>
)}
</div>

    </div>
  );
};

export default VideoPlayer;

