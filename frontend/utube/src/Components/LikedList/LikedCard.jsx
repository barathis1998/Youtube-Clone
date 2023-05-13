import React from "react";
import './LikedCard.scss';
import { BACKEND_URI } from "../Config/constants";
import axios from "axios";

const LikedCard = function ({medias}) {

    const handletoken = () =>{
        const token = localStorage.getItem("token");
        console.log(token);
        return token;
    }
      const token = handletoken();

      const handleView = () => {
        console.log("Inside handle view");
          axios
            .put(`${BACKEND_URI}/videos/${medias._id}/views`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
      };

      const handleHistory = () => {
        console.log("Inside History view");
        const data = { videoId: medias._id, type: "watch" };
        axios
          .post(`${BACKEND_URI}/histories`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

      
    //console.log(medias);

    return (
        <a href={`http://localhost:3000/video/${medias._id}`} onClick={(e) => {handleView(); handleHistory(); }}>
        <div className="video-card">
            <div className="thumbnail-container">
                <img className="thumbnail" src={`${BACKEND_URI}/public/videos/${medias.thumbNailUrl}`} />
                <video className="video-preview" src={`${BACKEND_URI}/public/videos/${medias.url}`} preload="metadata"></video>
            </div>
            <div className="info">
                <h4 className="title">{medias.title}</h4>
                <p className="description">{medias.description}</p>
                <p className="channel-name">{medias.userId.firstName}</p>
                <p className="views">{medias.views} views</p>
            </div>
        </div>
        </a>
    )
}

export default LikedCard;

