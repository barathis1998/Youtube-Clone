import React from "react";
import './HistoryCard.scss';
import { BACKEND_URI } from "../Config/constants";
import axios from "axios";

const HistoryCard = function ({medias}) {


    console.log((medias.videoId));
    const handletoken = () =>{
        const token = localStorage.getItem("token");
        console.log(token);
        return token;
    }
      const token = handletoken();

      const handleView = () => {
        console.log("Inside handle view");
          axios
            .put(`${BACKEND_URI}/videos/${medias.videoId._id}/views`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
      };

      const handleHistory = () => {
        console.log("Inside History view");
        const data = { videoId: medias.videoId._id, type: "watch" };
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

     // console.log(medias)


    return (

        <a href={`http://localhost:3000/video/${medias.videoId._id}`} onClick={(e) => {handleView(); handleHistory(); }}>
            <div className="video-card">
                <div className="thumbnail-container">
                <img className="thumbnail" src={`${BACKEND_URI}/public/videos/${medias.videoId.thumbNailUrl}`}/>
                    <video className="video-preview" src={`${BACKEND_URI}/public/videos/${medias.videoId.url}`} preload="metadata"></video>
                </div>
                <div className="info">
                    <h4 className="title">{medias.videoId.title}</h4>
                    <p className="description">{medias.videoId.description}</p>
                    <p className="channel-name">{medias.userId.firstName}</p>
                    <p className="views">{medias.videoId.views} views</p>
                </div>
            </div>
        </a>

    )
}

export default HistoryCard;