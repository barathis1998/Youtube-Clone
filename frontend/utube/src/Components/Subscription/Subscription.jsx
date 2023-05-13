import React from "react";
// import './VideoList.css';
import { BACKEND_URI } from "../Config/constants";
import { useState, useEffect } from "react";
import SubscriptionCard from "./SubscriptionCard";
import NavBar from "../NavBar/NavBar";
import Homepage from "../Homepage/homepage";

const Subscription = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  //let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ5ZDY2MjM3ODlhYjY0ZWE2M2ZhNyIsImlhdCI6MTY4MTYxNjQ5Nn0.1b0TVmOKlapiIuApPa4Xy76siWjkQyq1qjmdLbvcxfw";
  const handletoken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  };
  const token = handletoken();

  const getAllMedias = () => {
    console.log("inside media");
    fetch(`${BACKEND_URI}/subscriptions/videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMedias(data.data);
        console.log("reached");
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error Happened! in UPLOAD FORM");
      });
  };

  console.log(medias);
  const videolib = medias ? (
    medias.length > 0 ? (
      // <div className="subscription-card-container">
      medias.map((media) => <SubscriptionCard key={media._id} medias={media} />)
    ) : (
      /* </div> */
      <div className="no-subscribed-videos">No Subscribed videos</div>
    )
  ) : (
    <div className="no-subscribed-videos">No Subscribed videos</div>
  );

  return (
    <>
      <NavBar />
      <Homepage />
      <div className="video-container">{videolib}</div>
    </>
  );
};

export default Subscription;
